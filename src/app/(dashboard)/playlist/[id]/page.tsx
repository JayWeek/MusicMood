import { redirect } from "next/navigation";

export default function PlaylistPage({
  params,
}: {
  params: { id: string };
}) {
  redirect(`/playing?playlist=${params.id}`);
}
