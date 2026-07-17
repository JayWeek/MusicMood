export default function PlaybackCard() {
  return (
    <div className="rounded-xl bg-zinc-900 p-6">

      <h2 className="text-2xl font-semibold">
        Playback
      </h2>

      <div className="mt-5 space-y-4">

        <label className="flex gap-3">

          <input type="checkbox" defaultChecked />

          Autoplay

        </label>

        <label className="flex gap-3">

          <input type="checkbox" defaultChecked />

          Remember Queue

        </label>

        <label className="flex gap-3">

          <input type="checkbox" />

          Shuffle

        </label>

      </div>

    </div>
  );
}