"use client";

import { useEffect, useState } from "react";

import MoodDiscovery from "../home/mood-discovery";
import type { GeneratedMoodPrompt } from "../home/mood-prompt-list";
import { SUPPORTED_MOODS } from "@/lib/constants/supported-moods";

interface RandomPromptsResponse {
  randomPrompts: GeneratedMoodPrompt[];
}

export default function DashboardClient() {
  const [defaultPrompts, setDefaultPrompts] = useState<GeneratedMoodPrompt[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDefaultPrompts() {
      try {
        setIsLoading(true);
        setError(null);

        const randomIndex = Math.floor(Math.random() * SUPPORTED_MOODS.length);
        const randomMood = SUPPORTED_MOODS[randomIndex];

        const response = await fetch("/api/playlists/random", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mood: randomMood,
          }),
          signal: controller.signal,
          cache: "no-store",
        });

        const data = (await response.json()) as
          | RandomPromptsResponse
          | { message?: string };

        if (!response.ok) {
          throw new Error(
            "message" in data && data.message
              ? data.message
              : "Unable to generate default prompts."
          );
        }

        if (!("randomPrompts" in data) || !Array.isArray(data.randomPrompts)) {
          throw new Error("The server returned invalid prompt data.");
        }

        setDefaultPrompts(data.randomPrompts);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Failed to load default prompts:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to generate default prompts."
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadDefaultPrompts();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <MoodDiscovery
        isDefaultError={Boolean(error)}
        defaultPrompts={defaultPrompts}
        isLoadingDefaultPrompts={isLoading}
      />
    </div>
  );
}
