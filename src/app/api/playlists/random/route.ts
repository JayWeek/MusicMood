import { NextRequest, NextResponse } from "next/server";

import { groq } from "@/lib/groq";
import generateRandomPromptsFromAi from "@/lib/services/random-prompts";
import { randomPromptRequestSchema } from "@/lib/schema/random-prompts";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          message: "Invalid JSON request.",
        },
        {
          status: 400,
        }
      );
    }

    const validation = randomPromptRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Please select a supported mood.",
        },
        {
          status: 400,
        }
      );
    }

    const result = await generateRandomPromptsFromAi(groq, {
      mood: validation.data.mood,
    });

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Mood prompt generation failed:", error);

    return NextResponse.json(
      {
        message: "Unable to generate mood prompts. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}
