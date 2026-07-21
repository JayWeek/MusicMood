
"use client";

import { loginWithGitHub, loginWithGoogle } from "@/app/auth/actions";
import { FaGithub, FaGoogle } from "react-icons/fa6";

export default function SocialLogin() {
  return (
    <>
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-zinc-700" />

        <span className="text-xs text-zinc-500">
          OR CONTINUE WITH
        </span>

        <div className="h-px flex-1 bg-zinc-700" />
      </div>

      <div className="space-y-3">
        <button
          type="submit"
          formAction={loginWithGoogle}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-zinc-700 py-3 hover:border-white"
        >
          <FaGoogle className="text-zinc-400 hover:text-white" size={18} />
          Google
        </button>

        <button
          type="submit"
          formAction={loginWithGitHub}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-zinc-700 py-3 hover:border-white"
        >
          <FaGithub className="text-zinc-400 hover:text-white" size={20} />
          GitHub
        </button>
      </div>
    </>
  );
}