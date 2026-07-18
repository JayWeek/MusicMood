
import { FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";
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
        <button className="w-full rounded-full border border-zinc-700 py-3 hover:border-white">
          Google
        </button>

        <button className="flex w-full items-center justify-center gap-2 rounded-full border border-zinc-700 py-3 hover:border-white">
          <FaGithub className="cursor-pointer text-zinc-400 hover:text-white" size={22} />
         
          GitHub
        </button>
      </div>
    </>
  );
}