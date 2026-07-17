"use client";

import { useState } from "react";

import LoginFields from "./LoginFields";
import SignupFields from "./SignupFields";
import SocialLogin from "./SocialLogin";

interface AuthFormProps {
  isSignup: boolean;
  onToggle: () => void;
}

export default function AuthForm({
  isSignup,
  onToggle,
}: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log({
      name,
      email,
      password,
      confirmPassword,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {isSignup ? (
        <SignupFields
          name={name}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          onNameChange={setName}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onConfirmPasswordChange={setConfirmPassword}
        />
      ) : (
        <LoginFields
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
        />
      )}

      <button
        type="submit"
        className="w-full rounded-full bg-green-500 py-3 font-semibold text-black transition hover:bg-green-400"
      >
        {isSignup ? "Create Account" : "Sign In"}
      </button>

      <SocialLogin />

      <p className="pt-4 text-center text-sm text-zinc-400">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={onToggle}
              className="font-semibold text-green-500 hover:underline"
            >
              Sign In
            </button>
          </>
        ) : (
          <>
            No account?{" "}
            <button
              type="button"
              onClick={onToggle}
              className="font-semibold text-green-500 hover:underline"
            >
              Create One
            </button>
          </>
        )}
      </p>
    </form>
  );
}