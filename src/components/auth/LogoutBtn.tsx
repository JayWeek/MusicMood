"use client";

import { logout } from "@/app/api/actions/auth";
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
import { LogOut } from "lucide-react";
import { useFormStatus } from "react-dom";

function ConfirmLogoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-red-500 px-5 py-2 font-semibold text-white transition hover:bg-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Logging out…" : "Yes, log out"}
    </button>
  );
}

export default function LogOutBtn() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className="group flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition hover:border-red-500/40 hover:bg-red-500/15 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.98]"
          />
        }
      >
        <LogOut
          aria-hidden="true"
          className="size-4 transition-transform group-hover:-translate-x-0.5"
        />
        <span>Log out</span>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="rounded-2xl border border-green-500/50 bg-zinc-900 text-white shadow-[0_0_40px_rgba(34,197,94,0.12)] ring-1 ring-green-500/10"
      >
        <DialogHeader>
          <DialogTitle>Log out?</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Are you sure you want to end your MusicMood session?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose
            render={
              <button
                type="button"
                className="rounded-full border border-zinc-700 px-5 py-2 font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
              />
            }
          >
            No, stay
          </DialogClose>

          <form action={logout}>
            <ConfirmLogoutButton />
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
