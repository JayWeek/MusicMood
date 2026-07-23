import { NextRequest, NextResponse } from "next/server";
import {
  parseGeneratePlaylistRequest,
  generatePlaylistFromPrompt,
} from "@/lib/services/playlist-generator";

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const requestData = parseGeneratePlaylistRequest(body);
    const playlist = await generatePlaylistFromPrompt(requestData.prompt);

    return NextResponse.json({
      success: true,
      playlist,
    });
  } catch (error) {
    console.error("Groq playlist generation error:", error);

    const message = error instanceof Error ? error.message : "The playlist could not be generated.";
    const responseMessage =
      message.includes("We couldn't generate a playlist") || message.includes("The playlist could not be generated")
        ? "We couldn't generate a playlist from that prompt. Please try a different prompt or try again later."
        : message;

    return NextResponse.json(
      {
        success: false,
        message: responseMessage,
      },
      { status: 400 },
    );
  }
}