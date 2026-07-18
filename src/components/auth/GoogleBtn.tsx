"use client";

import { createClient } from "@/lib/supabase/client";
import { FaGoogle } from "react-icons/fa6";

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error.message);
    }
  };

  return (
    <button type="button" onClick={handleGoogleLogin} className="flex w-full items-center justify-center gap-2 rounded-full border border-zinc-700 py-3 hover:border-white">
            <FaGoogle className="cursor-pointer text-zinc-400 hover:text-white" size={22} />
      Continue with Google
    </button>
  );
}
