
"use client";

import { useState } from "react";

import PromptBox from "@/components/dashboard/PromptBox";
import MoodChips from "@/components/dashboard/MoodChips";
import GenerateButton from "@/components/dashboard/GenerateButton";
import LoadingAI from "@/components/dashboard/LoadingAI";

import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";

import PlaylistHeader from "@/components/playlist/PlayListHeader";
import {mockTracks}  from "@/lib/mockTracks";

export default function DashboardPage() {
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
    
    <div className="max-w-7xl mx-auto">

      {!generated ? (
        <DashboardSkeleton />
      ) : (
        <>
          <PromptBox
            value={prompt}
            onChange={setPrompt}
          />

          <MoodChips
            onSelect={setPrompt}
          />

          <GenerateButton
            loading={loading}
            onClick={generatePlaylist}
          />

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