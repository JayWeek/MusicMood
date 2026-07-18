"use client";

interface PromptBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PromptBox({
  value,
  onChange,
}: PromptBoxProps) {
  return (
    <textarea
      rows={5}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Describe your mood...

Example:
I'm coding late tonight and want relaxing music."
      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-5 text-white outline-none focus:border-green-500"
    />
  );
}