"use client";

import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import MoodDiscovery from "./mood-discovery";
import {
  SUPPORTED_MOODS,
  SupportedMood,
} from "@/lib/constants/supported-moods";
import type { RandomPromptsResponse } from "@/lib/schema/random-prompts";

export default function HomeHeader() {
  const [defaultPrompts, setDefaultPrompts] = useState<
    RandomPromptsResponse["randomPrompts"]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mood, setMood] = useState<SupportedMood>();

  useEffect(() => {
    const controller = new AbortController();

    async function getDefaultPrompts() {
      try {
        setIsLoading(true);
        setError(null);

        const randomIndex = Math.floor(Math.random() * SUPPORTED_MOODS.length);
        setMood(SUPPORTED_MOODS[randomIndex]);

        const response = await fetch("/api/playlists/random", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mood }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = (await response.json()) as RandomPromptsResponse;

        setDefaultPrompts(data.randomPrompts);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        console.error("Failed to load default prompts:", error);
        setError("Unable to load playlist ideas.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void getDefaultPrompts();

    return () => {
      controller.abort();
    };
  }, [mood]);

  if (isLoading) {
    return (
      <div className="flex min-h-52 items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <LoaderCircle
            className="size-7 animate-spin text-[#1ed760]"
            aria-hidden="true"
          />

          <div>
            <p className="font-medium text-white">
              Creating {mood?.toLowerCase()} ideas
            </p>

            <p className="mt-1 text-sm text-[#b3b3b3]">
              Finding listening moments that match your mood.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="mt-4 text-zinc-400">
        Pick a mood and discover playlist ideas made for it.
      </h1>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      <MoodDiscovery defaultPrompts={defaultPrompts} />
    </>
  );
}
