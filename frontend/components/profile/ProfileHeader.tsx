import { Camera } from "lucide-react";

export default function ProfileHeader() {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-green-700 via-green-600 to-green-500 p-8">

      <div className="flex flex-col items-center gap-6 md:flex-row">

        <div className="relative">

          <img
            src="https://i.pravatar.cc/200"
            alt="Profile"
            className="h-40 w-40 rounded-full border-4 border-white object-cover"
          />

          <button className="absolute bottom-2 right-2 rounded-full bg-black p-2">
            <Camera size={18} />
          </button>

        </div>

        <div>

          <p className="text-sm uppercase tracking-widest">
            Profile
          </p>

          <h1 className="mt-2 text-5xl font-black">
            ANYALECHI CHIDIEBERE
          </h1>

          <p className="mt-3 text-lg text-green-100">
            AI Music Explorer • Premium Member
          </p>

          <p className="mt-2 text-green-200">
            Joined January 2026
          </p>

        </div>

      </div>

    </section>
  );
}