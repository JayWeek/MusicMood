"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAudioStore } from "@/stores/audioStore";
import { generatePlaylist } from "@/lib/services/playlist-generation-client";
import GeneratePromptForm from "./generate-prompt";

export default function MusicMoodGeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [error, setError] = useState("");
  const router = useRouter();
  const setStorePlaylist = useAudioStore((state) => state.setPlaylist);

  // Safely manage the asynchronous layout ticking sequence
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < 3 ? prev + 1 : prev));
    }, 2500);

    return () => clearInterval(interval);
  }, [isLoading]);

  async function handleGeneratePlaylist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (prompt.trim().length < 3) {
      setError("Please describe how you are feeling.");
      return;
    }

    // Safely update initialization state inside the event handler instead of the effect hook
    setCurrentStepIndex(0);
    setIsLoading(true);
    setError("");

    try {
      const playlist = await generatePlaylist(prompt);
      setStorePlaylist(playlist);
      router.push("/playing");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong."
      );
      setIsLoading(false);
    }
  }

  return (
    <GeneratePromptForm
      handleGeneratePlaylist={handleGeneratePlaylist}
      isLoading={isLoading}
      currentStepIndex={currentStepIndex}
      setMoodText={setPrompt}
      moodText={prompt}
      error={error}
    />
  );
}
