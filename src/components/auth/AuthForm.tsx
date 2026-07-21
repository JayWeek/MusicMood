"use client";

import { useActionState, useState } from "react";

import { login, signUp, type AuthResponse } from "@/app/api/actions/auth";
import LoginFields from "./LoginFields";
import SignupFields from "./SignupFields";
import SocialLogin from "./SocialLogin";

interface AuthFormProps {
  isSignup: boolean;
  onToggle: () => void;
}

const initialState: AuthResponse = {
  success: false,
  message: "",
  errors: {},
};

export default function AuthForm({
  isSignup,
  onToggle,
}: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [signUpState, signUpAction, isSignUpPending] = useActionState(
    signUp,
    initialState,
  );
  const [loginState, loginAction, isLoginPending] = useActionState(
    login,
    initialState,
  );

  const state = isSignup ? signUpState : loginState;
  const isPending = isSignup ? isSignUpPending : isLoginPending;
  const action = isSignup ? signUpAction : loginAction;

  return (
    <form action={action} className="space-y-5">
      {isSignup ? (
        <SignupFields
          name={name}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          errors={state.errors}
          onNameChange={setName}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onConfirmPasswordChange={setConfirmPassword}
        />
      ) : (
        <LoginFields
          email={email}
          password={password}
          errors={state.errors}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
        />
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-green-500 py-3 font-semibold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending
          ? isSignup
            ? "Creating Account..."
            : "Signing In..."
          : isSignup
            ? "Create Account"
            : "Sign In"}
      </button>

      {state.message && (
        <p
          className={state.success ? "text-sm text-green-400" : "text-sm text-red-400"}
          aria-live="polite"
        >
          {state.message}
        </p>
      )}

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