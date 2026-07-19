"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";

export default function GoogleLoginButton() {
  const [oauthUrl, setOauthUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);

  const prepareGoogleLogin = async () => {
    setOauthUrl(null);
    setErrorMessage(null);
    setIsPreparing(true);

    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        skipBrowserRedirect: true,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setOauthUrl(data.url);
    }

    setIsPreparing(false);
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            onClick={prepareGoogleLogin}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-zinc-700 py-3 hover:border-white"
          />
        }
      >
        <FaGoogle className="text-zinc-400" size={22} />
        Sign in with Google
      </DialogTrigger>

      <DialogContent className="rounded-2xl border border-green-500/50 bg-zinc-900 text-white shadow-[0_0_40px_rgba(34,197,94,0.12)] ring-1 ring-green-500/10">
        <DialogHeader>
          <DialogTitle>Continue with Google?</DialogTitle>
          <DialogDescription className="text-zinc-400">
            You will be redirected to Google to choose an account and approve
            access, then returned to MusicMood.
          </DialogDescription>
        </DialogHeader>

        {isPreparing && (
          <p className="text-sm text-zinc-400" aria-live="polite">
            Preparing secure sign-in…
          </p>
        )}

        {errorMessage && (
          <p className="text-sm text-red-400" aria-live="polite">
            {errorMessage}
          </p>
        )}

        <DialogFooter>
          <DialogClose
            render={
              <button
                type="button"
                className="rounded-full px-5 py-2 text-zinc-300 hover:text-white"
              />
            }
          >
            Cancel
          </DialogClose>

          {oauthUrl && (
            <a
              href={oauthUrl}
              className="rounded-full bg-green-500 px-5 py-2 text-center font-semibold text-black hover:bg-green-400"
            >
              Continue with Google
            </a>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
