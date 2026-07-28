"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import MoodPicker, { MoodItem } from "./mood-picker";
import MoodPromptList, { GeneratedMoodPrompt } from "./mood-prompt-list";
import AlertModal from "../landing/alert-modal";

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

interface RandomPromptsResponse {
  randomPrompts: GeneratedMoodPrompt[];
}

interface MoodDiscoveryProps {
  defaultPrompts: GeneratedMoodPrompt[];
  isLoadingDefaultPrompts?: boolean;
  isDefaultError?: boolean;
}

const DEFAULT_ERROR_MESSAGE =
  "Unable to generate mood prompts. Please try again.";

function isGeneratedMoodPrompt(value: unknown): value is GeneratedMoodPrompt {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const prompt = value as Record<string, unknown>;

  return (
    typeof prompt.prompt === "string" &&
    prompt.prompt.trim().length > 0 &&
    typeof prompt.description === "string" &&
    prompt.description.trim().length > 0 &&
    Array.isArray(prompt.moods) &&
    prompt.moods.every((mood) => typeof mood === "string") &&
    Array.isArray(prompt.artistLike) &&
    prompt.artistLike.every((artist) => typeof artist === "string")
  );
}

function isRandomPromptsResponse(
  value: unknown
): value is RandomPromptsResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const response = value as Record<string, unknown>;

  return (
    Array.isArray(response.randomPrompts) &&
    response.randomPrompts.every(isGeneratedMoodPrompt)
  );
}

function getApiErrorMessage(value: unknown): string {
  if (typeof value !== "object" || value === null) {
    return DEFAULT_ERROR_MESSAGE;
  }

  const response = value as ApiErrorResponse;

  if (
    typeof response.message === "string" &&
    response.message.trim().length > 0
  ) {
    return response.message;
  }

  if (typeof response.error === "string" && response.error.trim().length > 0) {
    return response.error;
  }

  return DEFAULT_ERROR_MESSAGE;
}

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
    (selectedPrompt: GeneratedMoodPrompt) => {
      const mood = selectedMood?.id ?? selectedPrompt.moods.at(0);

      if (!mood) {
        setError("No mood was found for this playlist idea.");
        return;
      }

      console.log("Generate playlist using:", {
        prompt: selectedPrompt.prompt,
        mood,
        moods: selectedPrompt.moods,
        artistLike: selectedPrompt.artistLike,
      });

      // Next request:
      //
      // POST /api/playlists/generate
      //
      // {
      //   prompt: selectedPrompt.prompt,
      //   mood,
      //   moods: selectedPrompt.moods,
      //   artistLike: selectedPrompt.artistLike
      // }
    },
    [selectedMood]
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

  return (
    <>
      <div className="space-y-6 text-white">
        <MoodPicker onMoodChange={handleMoodChange} />

        <MoodPromptList
          prompts={visiblePrompts}
          selectedMood={displayedMood}
          isLoading={showLoading}
          onPromptClick={handlePromptClick}
          onRegenerate={selectedMood ? handleRegenerate : undefined}
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
