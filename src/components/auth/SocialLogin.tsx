import GoogleLoginButton from "./GoogleBtn";
import GithubLoginButton from "./GithubBtn";
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
       <GoogleLoginButton />

       <GithubLoginButton />
      </div>
    </>
  );
}