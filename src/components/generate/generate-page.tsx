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
      //generate playlist based on the prompt
      const playlist = await generatePlaylist(prompt);
      //set the playlist in the store and redirect to the now playing page
      setStorePlaylist(playlist);
      router.push("/playing");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong."
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
