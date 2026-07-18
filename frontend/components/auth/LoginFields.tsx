interface LoginFieldsProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
}

export default function LoginFields({
  email,
  password,
  onEmailChange,
  onPasswordChange,
}: LoginFieldsProps) {
  return (
    <>
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
    </>
  );
}