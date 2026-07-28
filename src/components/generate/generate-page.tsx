"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useAudioStore } from "@/stores/audioStore";
import { generatePlaylist } from "@/lib/services/playlist-generation-client";
import GeneratePromptForm from "./generate-prompt";

export default function MusicMoodGeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const setStorePlaylist = useAudioStore((state) => state.setPlaylist);

  async function handleGeneratePlaylist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (prompt.trim().length < 3) {
      setError("Please describe how you are feeling.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const playlist = await generatePlaylist(prompt);
      setStorePlaylist(playlist);
      const playlistParam = encodeURIComponent(JSON.stringify(playlist));
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
