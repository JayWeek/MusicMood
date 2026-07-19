"use client";

import { useState } from "react";

import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import GenerateButton from "@/components/dashboard/GenerateButton";
import LoadingAI from "@/components/dashboard/LoadingAI";
import MoodChips from "@/components/dashboard/MoodChips";
import PromptBox from "@/components/dashboard/PromptBox";
import PlaylistHeader from "@/components/playlist/PlayListHeader";
import { mockTracks } from "@/lib/mockTracks";

export default function DashboardClient() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  async function generatePlaylist() {
    if (!prompt) return;

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2500));

    setLoading(false);
    setGenerated(true);
  }

  return (
    <div className="mx-auto max-w-7xl">
      {!generated ? (
        <DashboardSkeleton />
      ) : (
        <>
          <PromptBox value={prompt} onChange={setPrompt} />

          <MoodChips onSelect={setPrompt} />

          <GenerateButton loading={loading} onClick={generatePlaylist} />

          {loading && <LoadingAI />}

          <PlaylistHeader
            title="Late Night Coding"
            totalSongs={mockTracks.length}
            duration="2h 18m"
            generatedBy="AI"
          />
        </>
      )}
    </div>
  );
}
