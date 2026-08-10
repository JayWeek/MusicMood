import { useParams } from "next/navigation";

export default function PlaylistPage() {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const message = `This is the playlist page for playlist with ID: ${id}`;
  return <div className="mx-auto max-w-7xl space-y-8">{message}</div>;
}
