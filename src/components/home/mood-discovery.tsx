"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MoodPicker, { MoodItem } from "./mood-picker";
import type { GeneratePlaylistResponse } from "@/lib/services/playlist-generation-client";
import MoodPromptList, { GeneratedMoodPrompt } from "./mood-prompt-list";
import AlertModal from "../landing/alert-modal";
import {
  MoodDiscoveryProps,
  getApiErrorMessage,
  isRandomPromptsResponse,
  DEFAULT_ERROR_MESSAGE,
} from "./types";

export default function MoodDiscovery({
  defaultPrompts,
  isLoadingDefaultPrompts = false,
  isDefaultError = false,
}: MoodDiscoveryProps) {
  const [selectedMood, setSelectedMood] = useState<MoodItem | null>(null);

  // Contains only prompts generated after the user selects a mood.
  const [generatedPrompts, setGeneratedPrompts] = useState<
    GeneratedMoodPrompt[]
  >([]);
  const router = useRouter();

  const [isGeneratingPlaylist, setIsGeneratingPlaylist] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDefaultErrorOpen, setIsDefaultErrorOpen] = useState(isDefaultError);

  const requestController = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  // Cancel any active request when the component unmounts.
  useEffect(() => {
    return () => {
      requestController.current?.abort();
    };
  }, []);

  const generatePrompts = useCallback(async (mood: MoodItem) => {
    // Cancel the previous request when another mood is selected.
    requestController.current?.abort();

    const controller = new AbortController();
    requestController.current = controller;

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setIsLoading(true);
    setError(null);
    setGeneratedPrompts([]);

    try {
      const response = await fetch("/api/playlists/random", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mood: mood.id,
        }),
        signal: controller.signal,
        cache: "no-store",
      });

      let data: unknown;

      try {
        data = await response.json();
      } catch {
        throw new Error("The server returned an invalid response.");
      }

      if (!response.ok) {
        throw new Error(getApiErrorMessage(data));
      }

      if (!isRandomPromptsResponse(data)) {
        throw new Error("The server returned invalid prompt data.");
      }

      // Ignore this response if a newer request exists.
      if (requestId !== requestIdRef.current) {
        return;
      }

      setGeneratedPrompts(data.randomPrompts);
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      if (requestId !== requestIdRef.current) {
        return;
      }

      setError(error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE);
    } finally {
      if (
        requestController.current === controller &&
        requestId === requestIdRef.current
      ) {
        requestController.current = null;
        setIsLoading(false);
      }
    }
  }, []);

  const handleMoodChange = useCallback(
    (mood: MoodItem | null) => {
      setSelectedMood(mood);
      setError(null);

      if (!mood) {
        requestController.current?.abort();
        requestController.current = null;
        requestIdRef.current += 1;

        setGeneratedPrompts([]);
        setIsLoading(false);

        return;
      }

      void generatePrompts(mood);
    },
    [generatePrompts]
  );

  const handlePromptClick = useCallback(
    async (selectedPrompt: GeneratedMoodPrompt) => {
      if (isGeneratingPlaylist) {
        return;
      }

      const mood = selectedMood?.id ?? selectedPrompt.moods.at(0);

      if (!mood) {
        setError("No mood was found for this playlist idea.");
        return;
      }

      console.log(mood);

      setIsGeneratingPlaylist(true);
      setError(null);

      try {
        const response = await fetch("/api/playlists/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          // The selected playlist idea already contains the mood.
          // Additional metadata must be included here for the API if needed.
          body: JSON.stringify({
            prompt: selectedPrompt.prompt,
          }),
        });

        let data: GeneratePlaylistResponse;

        try {
          data = (await response.json()) as GeneratePlaylistResponse;
          console.log(data);
        } catch {
          throw new Error("The server returned an invalid response.");
        }

        if (!response.ok || !data.success || !data.playlist) {
          throw new Error(
            data.message ?? "The playlist could not be generated."
          );
        }

        const playlistParam = encodeURIComponent(JSON.stringify(data.playlist));

        router.push(`/playing?playlist=${playlistParam}`);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong while generating the playlist."
        );
      } finally {
        setIsGeneratingPlaylist(false);
      }
    },
    [isGeneratingPlaylist, router, selectedMood]
  );

  const handleRegenerate = useCallback(() => {
    if (!selectedMood || isLoading) {
      return;
    }

    void generatePrompts(selectedMood);
  }, [generatePrompts, isLoading, selectedMood]);

  // Before a mood is selected, use the asynchronously loaded
  // default prompts directly from the parent.
  const visiblePrompts = selectedMood ? generatedPrompts : defaultPrompts;

  const displayedMood =
    selectedMood?.label ?? visiblePrompts.at(0)?.moods.at(0);

  const showLoading = selectedMood ? isLoading : isLoadingDefaultPrompts;

  const modalMessage =
    error ??
    (isDefaultErrorOpen ? "Unable to load the default playlist ideas." : "");

  const handleCloseError = () => {
    setError(null);
    setIsDefaultErrorOpen(false);
  };

  const showAnyLoading = showLoading || isGeneratingPlaylist;
  return (
    <>
      <div className="space-y-6 text-white">
        <MoodPicker onMoodChange={handleMoodChange} />

        <MoodPromptList
          prompts={visiblePrompts}
          selectedMood={displayedMood}
          isLoading={showAnyLoading}
          onPromptClick={handlePromptClick}
          onRegenerate={
            selectedMood && !isGeneratingPlaylist ? handleRegenerate : undefined
          }
        />
      </div>

      <AlertModal
        open={Boolean(error) || isDefaultErrorOpen}
        title="Unable to generate prompts"
        message={modalMessage}
        onClose={handleCloseError}
      />
    </>
  );
}
