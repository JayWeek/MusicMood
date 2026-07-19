import type { AuthErrors } from "@/app/api/actions/auth";

interface SignupFieldsProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors?: AuthErrors;

  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
}

export default function SignupFields({
  name,
  email,
  password,
  confirmPassword,
  errors,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
}: SignupFieldsProps) {
  return (
    <>
      <div>
        <label className="mb-2 block text-sm">
          Full Name
        </label>

        <input
          name="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-green-500"
          aria-invalid={Boolean(errors?.name)}
        />
        {errors?.name?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-400">{error}</p>
        ))}
      </div>

      <div>
        <label className="mb-2 block text-sm">
          Email
        </label>

        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-green-500"
          aria-invalid={Boolean(errors?.email)}
        />
        {errors?.email?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-400">{error}</p>
        ))}
      </div>

      <div>
        <label className="mb-2 block text-sm">
          Password
        </label>

        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-green-500"
          aria-invalid={Boolean(errors?.password)}
        />
        {errors?.password?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-400">{error}</p>
        ))}
      </div>

      <div>
        <label className="mb-2 block text-sm">
          Confirm Password
        </label>

        <input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-green-500"
          aria-invalid={Boolean(errors?.confirmPassword)}
        />
        {errors?.confirmPassword?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-400">{error}</p>
        ))}
      </div>
    </>
  );
}
