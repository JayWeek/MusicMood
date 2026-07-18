"use client";

import { Volume2 } from "lucide-react";

export default function VolumeControl() {
  return (
    <div className="flex items-center gap-3 w-56">

      <Volume2 size={18} />

      <input
        type="range"
        min={0}
        max={100}
        defaultValue={70}
        className="w-full accent-green-500"
      />

    </div>
  );
}