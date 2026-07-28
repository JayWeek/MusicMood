export default interface FavoriteSong {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  createdAt: string;
  album?: string;
  duration?: string;
  thumbnail?: string; // Changed from artwork to thumbnail for consistency
}
