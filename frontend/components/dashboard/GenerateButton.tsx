interface Props {
  loading: boolean;
  onClick: () => void;
}

export default function GenerateButton({
  loading,
  onClick,
}: Props) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className="mt-8 rounded-full bg-green-500 px-8 py-4 font-semibold text-black transition hover:bg-green-400 disabled:opacity-60"
    >
      {loading ? "Generating..." : "Generate Playlist"}
    </button>
  );
}