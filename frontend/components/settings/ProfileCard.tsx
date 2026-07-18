export default function ProfileCard() {
  return (
    <div className="rounded-xl bg-zinc-900 p-6">

      <h2 className="text-2xl font-semibold">
        Profile
      </h2>

      <div className="mt-6 space-y-4">

        <input
          placeholder="Full Name"
          className="w-full rounded-lg bg-zinc-800 p-3"
        />

        <input
          placeholder="Email"
          className="w-full rounded-lg bg-zinc-800 p-3"
        />

      </div>

    </div>
  );
}