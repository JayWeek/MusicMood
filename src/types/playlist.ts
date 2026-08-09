export type PlaylistData = {
  playlistId: string;
  prompt: string;
  title: string;
  thumbnail?: string;
  description: string;
  createdAt: string;
};

export type PlaylistDataType = {
  id: string;
  user_id: string;
  title: string;
  prompt: string;
  moods: string[];
  description: string;
  created_at: string;
};
