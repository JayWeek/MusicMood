interface SignupFieldsProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;

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
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-green-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-green-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-green-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm">
          Confirm Password
        </label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-green-500"
        />
      </div>
    </>
  );
}