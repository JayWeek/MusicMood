import Track from "@/types/track";

export const mockHistory: Track[] = [
  {
    id: 1,
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    duration: "4:03",
    artwork: "https://picsum.photos/100?31",
    liked: true,
    playedAt: "Today • 8:42 PM",
  },
  {
    id: 2,
    title: "Holocene",
    artist: "Bon Iver",
    album: "Bon Iver",
    duration: "5:36",
    artwork: "https://picsum.photos/100?32",
    liked: false,
    playedAt: "Yesterday • 6:30 PM",
  },
  {
    id: 3,
    title: "Intro",
    artist: "The xx",
    album: "xx",
    duration: "2:08",
    artwork: "https://picsum.photos/100?33",
    liked: true,
    playedAt: "Monday • 11:15 PM",
  },
];
