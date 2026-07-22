import { NextRequest, NextResponse } from "next/server";
import { groq } from "@/lib/groq";
import { playlistSchema } from "@/lib/schema/playlist.schema";

const requestSchema = {
    safeParse(value: unknown) {
        if (
            typeof value === "object" &&
            value !== null &&
            "moodText" in value &&
            typeof value.moodText === "string" &&
            value.moodText.trim().length >= 3
        ) {
            return {
                success: true as const,
                data: {
                    moodText: value.moodText.trim(),
                },
            };
        }

        return {
            success: false as const,
        };
    },
};

export async function POST(request: NextRequest) {
    try {
        const body: unknown = await request.json();
        const result = requestSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                {
                    message:
                        "Please describe your mood using at least three characters.",
                },
                { status: 400 },
            );
        }

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "system",
                    content: `
You are MusicMood, an AI music recommendation system.
Your task is to:

1. Analyse the user's emotional state from their message.
2. Identify the main mood.
3. Create an appropriate playlist title.
4. Recommend between 10 and 15 real songs.
5. Explain briefly why each song matches the mood.
6. If users include any artist and song add it as the very first song in the playlist 

Recommendations should consider:
- the user's emotional state;
- whether they want encouragement, relaxation, focus or energy;
- the emotional tone and message of each song;
- a balanced selection of artists.

Do not invent songs or artists.
          `.trim(),
                },
                {
                    role: "user",
                    content: result.data.moodText,
                },
            ],

            temperature: 0.7,
            max_completion_tokens: 1500,

            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "generated_music_playlist",
                    strict: true,
                    schema: {
                        type: "object",
                        properties: {
                            mood: {
                                type: "string",
                                description: "The main mood detected from the user's message.",
                            },
                            title: {
                                type: "string",
                                description: "A short and creative playlist title.",
                            },
                            description: {
                                type: "string",
                                description:
                                    "A brief explanation of the playlist's emotional direction.",
                            },
                            tracks: {
                                type: "array",
                                minItems: 10,
                                maxItems: 15,
                                items: {
                                    type: "object",
                                    properties: {
                                        title: {
                                            type: "string",
                                            description: "The official song title.",
                                        },
                                        artist: {
                                            type: "string",
                                            description:
                                                "The name of the musician or musical group.",
                                        },
                                        reason: {
                                            type: "string",
                                            description:
                                                "A short reason why this song fits the detected mood.",
                                        },
                                    },
                                    required: ["title", "artist", "reason"],
                                    additionalProperties: false,
                                },
                            },
                        },
                        required: ["mood", "title", "description", "tracks"],
                        additionalProperties: false,
                    },
                },
            },
        });

        const content = completion.choices[0]?.message?.content;

        if (!content) {
            return NextResponse.json(
                {
                    message: "Cant find a playlist for this mood please try again.",
                },
                { status: 502 },
            );
        }

        const parsedContent: unknown = JSON.parse(content);

        // Validate again inside our application.
        const playlist = playlistSchema.parse(parsedContent);

        console.log(playlist)

        return NextResponse.json({
            success: true,
            playlist,
            usage: {
                promptTokens: completion.usage?.prompt_tokens ?? 0,
                completionTokens: completion.usage?.completion_tokens ?? 0,
                totalTokens: completion.usage?.total_tokens ?? 0,
            },
        });
    } catch (error) {
        console.error("Groq playlist generation error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "The playlist could not be generated.",
            },
            { status: 500 },
        );
    }
}