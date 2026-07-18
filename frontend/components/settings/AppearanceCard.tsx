export default function AppearanceCard() {
  return (
    <div className="rounded-xl bg-zinc-900 p-6">

      <h2 className="text-2xl font-semibold">
        Appearance
      </h2>

      <div className="mt-5">

        <label className="flex items-center gap-3">

          <input type="radio" checked />

          Dark Theme

        </label>

      </div>

    </div>
  );
}