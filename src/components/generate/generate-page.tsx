"use client";

import { FormEvent, useState } from "react";
import type { GeneratedPlaylist } from "@/lib/schema/playlist.schema";
import GeneratePromptForm from "./generate-prompt";
import { useRouter } from "next/navigation";

type GeneratePlaylistResponse = {
  success: boolean;
  playlist?: GeneratedPlaylist;
  message?: string;
};

export default function MusicMoodGeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [, setPlaylist] = useState<GeneratedPlaylist | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleGeneratePlaylist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (prompt.trim().length < 3) {
      setError("Please describe how you are feeling.");
      return;
    }

    setIsLoading(true);
    setError("");
    setPlaylist(null);

    try {
      const response = await fetch("/api/playlists/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = (await response.json()) as GeneratePlaylistResponse;

      if (!response.ok || !data.success || !data.playlist) {
        throw new Error(data.message ?? "The playlist could not be generated.");
      }

      setPlaylist(data.playlist);
      const playlistParam = encodeURIComponent(JSON.stringify(data.playlist));
      router.push(`/playing?playlist=${playlistParam}`);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <GeneratePromptForm
      handleGeneratePlaylist={handleGeneratePlaylist}
      isLoading={isLoading}
      setMoodText={setPrompt}
      moodText={prompt}
      error={error}
    />
  );
}
