
export default interface track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  artwork: string;

  // Optional fields
  liked?: boolean;
  source?: string;
  playedAt?: string;
}