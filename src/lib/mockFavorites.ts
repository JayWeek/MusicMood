import FavoriteSong from "@/types/favorite";

export const mockFavorites: FavoriteSong[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    youtubeId: "blinding-lights",
    createdAt: new Date().toISOString(),
    album: "After Hours",
    duration: "3:42",
    artwork: "https://picsum.photos/100?10",
  },
  {
    id: "2",
    title: "Midnight City",
    artist: "M83",
    youtubeId: "midnight-city",
    createdAt: new Date().toISOString(),
    album: "Hurry Up, We're Dreaming",
    duration: "4:03",
    artwork: "https://picsum.photos/100?11",
  },
  {
    id: "3",
    title: "Holocene",
    artist: "Bon Iver",
    youtubeId: "holocene",
    createdAt: new Date().toISOString(),
    album: "Bon Iver",
    duration: "5:36",
    artwork: "https://picsum.photos/100?12",
  },
];
