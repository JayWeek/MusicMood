import { create } from "zustand";

import type { GeneratedPlaylist } from "@/lib/schema/playlist.schema";

export type PlaylistSong = {
  title: string;
  artist: string;
  videoId: string;
  thumbnail: string;
  duration: string;
};

export type RepeatMode = "off" | "all" | "one";

export type PlaylistData = {
  title: string;
  description?: string;
  mood?: string[];
  songs: PlaylistSong[];
};

type PlaylistInput =
  | GeneratedPlaylist
  | PlaylistData
  | {
      playlist?: PlaylistData | GeneratedPlaylist;
      title?: string;
      description?: string;
      mood?: string[];
      songs?: PlaylistSong[];
      tracks?: Array<{
        title: string;
        artist: string;
        videoId?: string;
        thumbnail?: string;
        duration?: string;
      }>;
    };

type AudioState = {
  playlist: PlaylistData | null;
  currentSongIndex: number;
  currentSong: PlaylistSong | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  isMuted: boolean;
  isShuffleEnabled: boolean;
  repeatMode: RepeatMode;
  seekTarget: number | null;
};

type AudioActions = {
  setPlaylist: (playlist: PlaylistInput) => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  toggleShuffle: () => void;
  cycleRepeatMode: () => void;
  selectSong: (index: number) => void;
  next: () => void;
  previous: () => void;
  seek: (seconds: number) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  setMuted: (value: boolean) => void;
  clearPlaylist: () => void;
  clearSeekTarget: () => void;
};

function normalizeSong(song: Partial<PlaylistSong> | undefined): PlaylistSong {
  return {
    title: song?.title ?? "Untitled Song",
    artist: song?.artist ?? "Unknown Artist",
    videoId: song?.videoId ?? "",
    thumbnail: song?.thumbnail ?? "",
    duration: song?.duration ?? "0:00",
  };
}

function normalizePlaylist(input: PlaylistInput | null | undefined): PlaylistData | null {
  if (!input) {
    return null;
  }

  const maybeWrapped = input as PlaylistInput & {
    playlist?: PlaylistData | GeneratedPlaylist | null;
  };
  const source =
    maybeWrapped.playlist && typeof maybeWrapped.playlist === "object"
      ? maybeWrapped.playlist
      : input;

  if (!source || typeof source !== "object") {
    return null;
  }

  const candidate = source as PlaylistData & {
    songs?: PlaylistSong[];
    tracks?: Array<{
      title: string;
      artist: string;
      videoId?: string;
      thumbnail?: string;
      duration?: string;
    }>;
    title?: string;
    description?: string;
    mood?: string[];
  };

  const songs = Array.isArray(candidate.songs)
    ? candidate.songs.map((song) => normalizeSong(song))
    : Array.isArray(candidate.tracks)
      ? candidate.tracks.map((track) => normalizeSong({
          title: track.title,
          artist: track.artist,
          videoId: track.videoId,
          thumbnail: track.thumbnail,
          duration: track.duration,
        }))
      : [];

  return {
    title: candidate.title ?? "Untitled Playlist",
    description: candidate.description ?? "",
    mood: Array.isArray(candidate.mood) ? candidate.mood : [],
    songs,
  };
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const useAudioStore = create<AudioState & AudioActions>()((set, get) => ({
  playlist: null,
  currentSongIndex: -1,
  currentSong: null,
  isPlaying: false,
  volume: 70,
  progress: 0,
  duration: 0,
  isMuted: false,
  isShuffleEnabled: false,
  repeatMode: "off",
  seekTarget: null,

    setPlaylist: (playlistInput) => {
    const playlist = normalizePlaylist(playlistInput);
    const firstSong = playlist?.songs[0] ?? null;

    set({
        playlist,
        currentSongIndex: firstSong ? 0 : -1,
        currentSong: firstSong,
        isPlaying: false, // Start as FALSE to let the user click play first
        progress: 0,
        duration: 0,
        seekTarget: null,
    });
    },

  play: () => set({ isPlaying: true }),

  pause: () => set({ isPlaying: false }),

  toggle: () => set((state) => ({ isPlaying: !state.isPlaying })),

  toggleShuffle: () =>
    set((state) => ({ isShuffleEnabled: !state.isShuffleEnabled })),

  cycleRepeatMode: () =>
    set((state) => ({
      repeatMode:
        state.repeatMode === "off"
          ? "all"
          : state.repeatMode === "all"
            ? "one"
            : "off",
    })),

  selectSong: (index) => {
    const songs = get().playlist?.songs ?? [];
    const song = songs[index];

    if (!song) {
      return;
    }

    set({
      currentSongIndex: index,
      currentSong: song,
      isPlaying: true,
      progress: 0,
      duration: 0,
      seekTarget: null,
    });
  },

  next: () => {
    const { currentSongIndex, isShuffleEnabled, repeatMode } = get();
    const songs = get().playlist?.songs ?? [];

    if (songs.length === 0 || currentSongIndex < 0) {
      return;
    }

    if (repeatMode === "one") {
      set({ isPlaying: true, progress: 0, seekTarget: 0 });
      return;
    }

    const isLastSong = currentSongIndex >= songs.length - 1;
    if (isLastSong && !isShuffleEnabled && repeatMode !== "all") {
      set({ isPlaying: false, progress: get().duration, seekTarget: null });
      return;
    }

    const availableIndices = songs
      .map((_, index) => index)
      .filter((index) => index !== currentSongIndex);
    const nextIndex = isShuffleEnabled && availableIndices.length > 0
      ? availableIndices[Math.floor(Math.random() * availableIndices.length)]
      : isLastSong
        ? 0
        : currentSongIndex + 1;

    set({
      currentSongIndex: nextIndex,
      currentSong: songs[nextIndex] ?? null,
      isPlaying: true,
      progress: 0,
      duration: 0,
      seekTarget: null,
    });
  },

  previous: () => {
    const songs = get().playlist?.songs ?? [];
    const previousIndex = get().currentSongIndex - 1;

    if (previousIndex < 0) {
      set({ isPlaying: false, progress: 0, duration: 0, seekTarget: null });
      return;
    }

    set({
      currentSongIndex: previousIndex,
      currentSong: songs[previousIndex] ?? null,
      isPlaying: true,
      progress: 0,
      duration: 0,
      seekTarget: null,
    });
  },

  seek: (seconds) => {
    set({
      progress: clamp(seconds, 0, get().duration || seconds),
      seekTarget: clamp(seconds, 0, get().duration || seconds),
    });
  },

  setVolume: (volume) => {
    set({ volume: clamp(volume, 0, 100) });
  },

  setProgress: (progress) => {
    set({ progress: clamp(progress, 0, get().duration || progress) });
  },

  setDuration: (duration) => set({ duration: Math.max(duration, 0) }),

  setMuted: (value) => set({ isMuted: value }),

  clearPlaylist: () =>
    set({
      playlist: null,
      currentSongIndex: -1,
      currentSong: null,
      isPlaying: false,
      progress: 0,
      duration: 0,
      seekTarget: null,
    }),

  clearSeekTarget: () => set({ seekTarget: null }),
}));
