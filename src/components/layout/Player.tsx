"use client";

import { useState } from "react";

import PlayerInfo from "../player/PlayerInfo";
import PlayerControls from "../player/PlayerControls";
import ProgressBar from "../player/ProgressBar";
import VolumeControl from "../player/VolumeControl";

export default function Player() {
  const [playing, setPlaying] = useState(false);

  return (
    <footer className="z-50 shrink-0 border-t border-zinc-800 bg-[#181818] px-6 py-4">

      <div className="grid grid-cols-3 items-center gap-8">

        <PlayerInfo
          title="Midnight City"
          artist="M83"
          artwork="https://picsum.photos/200"
          liked
        />

        <div className="flex flex-col items-center gap-3">

          <PlayerControls
            playing={playing}
            onToggle={() => setPlaying(!playing)}
          />

          <ProgressBar
            current="1:12"
            duration="4:03"
          />

        </div>

        <div className="flex justify-end">

          <VolumeControl />

        </div>

      </div>

    </footer>
  );
}
