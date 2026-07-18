"use client";

import { useState } from "react";

import AuthHeader from "./AuthHeader";
import AuthForm from "./AuthForm";

export default function AuthCard() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#181818] p-8 shadow-2xl">
      <AuthHeader isSignup={isSignup} />

      <AuthForm
        isSignup={isSignup}
        onToggle={() => setIsSignup(!isSignup)}
      />
    </div>
  );
}