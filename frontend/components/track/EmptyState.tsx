import { Music2 } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900/40 p-10 text-center">
      <div className="mb-6 rounded-full bg-zinc-800 p-5">
        {icon ?? <Music2 className="h-12 w-12 text-zinc-500" />}
      </div>

      <h2 className="text-2xl font-bold text-white">{title}</h2>

      <p className="mt-3 max-w-md text-zinc-400">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}