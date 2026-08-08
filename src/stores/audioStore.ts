import { create } from "zustand";

import type { GeneratedPlaylist } from "@/lib/schema/playlist.schema";

import {
  isFavoriteSong,
  toggleFavoriteSong,
  type FavoriteSongInput,
} from "@/lib/services/favorites";

/* =========================================================
 * TYPES
 * ======================================================= */

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
  /* =====================================================
   * PLAYLIST
   * =================================================== */

  playlist: PlaylistData | null;

  currentSongIndex: number;

  currentSong: PlaylistSong | null;

  /* =====================================================
   * PLAYER
   * =================================================== */

  isPlaying: boolean;

  volume: number;

  progress: number;

  duration: number;

  isMuted: boolean;

  mood: string;

  /* =====================================================
   * FAVORITES
   * =================================================== */

  /**
   * Legacy value.
   *
   * Kept so existing components that still use `liked`
   * don't immediately break.
   */
  liked: boolean;

  /**
   * Favorite status indexed by YouTube ID.
   *
   * Example:
   *
   * {
   *   "abc123": true,
   *   "xyz456": false
   * }
   */
  favoriteStatuses: Record<string, boolean>;

  /**
   * Tracks favorite loading per song.
   */
  favoriteLoading: Record<string, boolean>;

  /**
   * Tracks favorite saving per song.
   */
  favoriteSaving: Record<string, boolean>;

  /**
   * Used to prevent an old favorite request
   * from overwriting a newer request.
   */
  favoriteRequestIds: Record<string, number>;

  /* =====================================================
   * PLAYBACK OPTIONS
   * =================================================== */

  isShuffleEnabled: boolean;

  repeatMode: RepeatMode;

  seekTarget: number | null;
};

/* =========================================================
 * ACTIONS
 * ======================================================= */

type AudioActions = {
  /* Playlist */
  setPlaylist: (playlist: PlaylistInput) => void;

  /* Playback */
  play: () => void;
  pause: () => void;
  toggle: () => void;

  /* Shuffle / repeat */
  toggleShuffle: () => void;
  cycleRepeatMode: () => void;

  /* Song selection */
  selectSong: (index: number) => void;

  next: () => void;

  previous: () => void;

  /* Progress */
  seek: (seconds: number) => void;

  setVolume: (volume: number) => void;

  setProgress: (progress: number) => void;

  setDuration: (duration: number) => void;

  setMuted: (value: boolean) => void;

  /* Legacy */
  setLiked: (liked: boolean) => void;

  /* Playlist cleanup */
  clearPlaylist: () => void;

  clearSeekTarget: () => void;

  /* =====================================================
   * FAVORITES
   * =================================================== */

  /**
   * Manually set favorite status.
   */
  setFavoriteStatus: (youtubeId: string, liked: boolean) => void;

  /**
   * Load favorite status from database.
   */
  loadFavoriteStatus: (youtubeId: string) => Promise<boolean>;

  /**
   * Toggle the currently playing song.
   */
  toggleCurrentFavorite: () => Promise<boolean>;

  /**
   * Toggle any song.
   *
   * Used by FavoriteButton / FavoriteRow / playlist rows.
   */
  toggleFavorite: (song: FavoriteSongInput) => Promise<boolean>;
};

/* =========================================================
 * NORMALIZATION
 * ======================================================= */

function normalizeSong(song: Partial<PlaylistSong> | undefined): PlaylistSong {
  return {
    title: song?.title ?? "Untitled Song",

    artist: song?.artist ?? "Unknown Artist",

    videoId: song?.videoId ?? "",

    thumbnail: song?.thumbnail ?? "",

    duration: song?.duration ?? "0:00",
  };
}

function normalizePlaylist(
  input: PlaylistInput | null | undefined
): PlaylistData | null {
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
      ? candidate.tracks.map((track) =>
          normalizeSong({
            title: track.title,
            artist: track.artist,
            videoId: track.videoId,
            thumbnail: track.thumbnail,
            duration: track.duration,
          })
        )
      : [];

  return {
    title: candidate.title ?? "Untitled Playlist",

    description: candidate.description ?? "",

    mood: Array.isArray(candidate.mood) ? candidate.mood : [],

    songs,
  };
}

/* =========================================================
 * HELPERS
 * ======================================================= */

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function isValidVideoId(videoId: string | null | undefined): videoId is string {
  if (!videoId?.trim()) {
    return false;
  }

  return !videoId.trim().toLowerCase().startsWith("unknown");
}

/* =========================================================
 * STORE
 * ======================================================= */

export const useAudioStore = create<AudioState & AudioActions>()(
  (set, get) => ({
    /* =====================================================
     * INITIAL STATE
     * =================================================== */

    playlist: null,

    currentSongIndex: -1,

    currentSong: null,

    isPlaying: false,

    volume: 70,

    progress: 0,

    duration: 0,

    isMuted: false,

    mood: "",

    liked: false,

    favoriteStatuses: {},

    favoriteLoading: {},

    favoriteSaving: {},

    favoriteRequestIds: {},

    isShuffleEnabled: false,

    repeatMode: "off",

    seekTarget: null,

    /* =====================================================
     * PLAYLIST
     * =================================================== */

    setPlaylist: (playlistInput) => {
      const playlist = normalizePlaylist(playlistInput);

      const firstSong = playlist?.songs[0] ?? null;

      const cachedFavorite = firstSong
        ? get().favoriteStatuses[firstSong.videoId]
        : false;

      set({
        playlist,

        currentSongIndex: firstSong ? 0 : -1,

        currentSong: firstSong,

        mood: playlist?.mood?.[0] ?? "",

        isPlaying: false,

        progress: 0,

        duration: 0,

        seekTarget: null,

        liked: cachedFavorite ?? false,
      });

      if (firstSong && isValidVideoId(firstSong.videoId)) {
        void get().loadFavoriteStatus(firstSong.videoId);
      }
    },

    /* =====================================================
     * PLAYBACK
     * =================================================== */

    play: () => {
      const { currentSong } = get();

      if (!currentSong) {
        return;
      }

      set({
        isPlaying: true,
      });
    },

    pause: () => {
      set({
        isPlaying: false,
      });
    },

    toggle: () => {
      const { currentSong } = get();

      if (!currentSong) {
        return;
      }

      set((state) => ({
        isPlaying: !state.isPlaying,
      }));
    },

    /* =====================================================
     * SHUFFLE / REPEAT
     * =================================================== */

    toggleShuffle: () => {
      set((state) => ({
        isShuffleEnabled: !state.isShuffleEnabled,
      }));
    },

    cycleRepeatMode: () => {
      set((state) => ({
        repeatMode:
          state.repeatMode === "off"
            ? "all"
            : state.repeatMode === "all"
              ? "one"
              : "off",
      }));
    },

    /* =====================================================
     * SELECT SONG
     * =================================================== */

    selectSong: (index) => {
      const songs = get().playlist?.songs ?? [];

      const song = songs[index];

      if (!song) {
        return;
      }

      const cachedFavorite = get().favoriteStatuses[song.videoId];

      set({
        currentSongIndex: index,

        currentSong: song,

        isPlaying: true,

        progress: 0,

        duration: 0,

        seekTarget: 0,

        liked: cachedFavorite ?? false,
      });

      if (isValidVideoId(song.videoId)) {
        void get().loadFavoriteStatus(song.videoId);
      }
    },

    /* =====================================================
     * NEXT
     * =================================================== */

    next: () => {
      const { currentSongIndex, isShuffleEnabled, repeatMode, duration } =
        get();

      const songs = get().playlist?.songs ?? [];

      if (songs.length === 0 || currentSongIndex < 0) {
        return;
      }

      if (repeatMode === "one") {
        set({
          isPlaying: true,

          progress: 0,

          seekTarget: 0,
        });

        return;
      }

      const isLastSong = currentSongIndex >= songs.length - 1;

      if (isLastSong && !isShuffleEnabled && repeatMode !== "all") {
        set({
          isPlaying: false,

          progress: duration,

          seekTarget: null,
        });

        return;
      }

      const availableIndices = songs
        .map((_, index) => index)
        .filter((index) => index !== currentSongIndex);

      const nextIndex =
        isShuffleEnabled && availableIndices.length > 0
          ? availableIndices[
              Math.floor(Math.random() * availableIndices.length)
            ]
          : isLastSong
            ? 0
            : currentSongIndex + 1;

      const nextSong = songs[nextIndex] ?? null;

      if (!nextSong) {
        return;
      }

      const cachedFavorite = get().favoriteStatuses[nextSong.videoId];

      set({
        currentSongIndex: nextIndex,

        currentSong: nextSong,

        isPlaying: true,

        progress: 0,

        duration: 0,

        seekTarget: 0,

        liked: cachedFavorite ?? false,
      });

      if (isValidVideoId(nextSong.videoId)) {
        void get().loadFavoriteStatus(nextSong.videoId);
      }
    },

    /* =====================================================
     * PREVIOUS
     * =================================================== */

    previous: () => {
      const { currentSongIndex, progress } = get();

      const songs = get().playlist?.songs ?? [];

      if (songs.length === 0 || currentSongIndex < 0) {
        return;
      }

      if (progress > 3) {
        set({
          progress: 0,

          isPlaying: true,

          seekTarget: 0,
        });

        return;
      }

      const previousIndex = currentSongIndex - 1;

      if (previousIndex < 0) {
        set({
          progress: 0,

          isPlaying: true,

          seekTarget: 0,
        });

        return;
      }

      const previousSong = songs[previousIndex] ?? null;

      if (!previousSong) {
        return;
      }

      const cachedFavorite = get().favoriteStatuses[previousSong.videoId];

      set({
        currentSongIndex: previousIndex,

        currentSong: previousSong,

        isPlaying: true,

        progress: 0,

        duration: 0,

        seekTarget: 0,

        liked: cachedFavorite ?? false,
      });

      if (isValidVideoId(previousSong.videoId)) {
        void get().loadFavoriteStatus(previousSong.videoId);
      }
    },

    /* =====================================================
     * SEEK
     * =================================================== */

    seek: (seconds) => {
      const maximum = get().duration || seconds;

      const nextPosition = clamp(seconds, 0, maximum);

      set({
        progress: nextPosition,

        seekTarget: nextPosition,
      });
    },

    /* =====================================================
     * VOLUME
     * =================================================== */

    setVolume: (volume) => {
      set({
        volume: clamp(volume, 0, 100),
      });
    },

    setProgress: (progress) => {
      const maximum = get().duration || progress;

      set({
        progress: clamp(progress, 0, maximum),
      });
    },

    setDuration: (duration) => {
      set({
        duration: Math.max(duration, 0),
      });
    },

    setMuted: (value) => {
      set({
        isMuted: value,
      });
    },

    /* =====================================================
     * LEGACY LIKED
     * =================================================== */

    setLiked: (liked) => {
      const currentSong = get().currentSong;

      if (!currentSong?.videoId) {
        set({
          liked,
        });

        return;
      }

      set((state) => ({
        liked,

        favoriteStatuses: {
          ...state.favoriteStatuses,

          [currentSong.videoId]: liked,
        },
      }));
    },

    /* =====================================================
     * SET FAVORITE STATUS
     * =================================================== */

    setFavoriteStatus: (youtubeId, liked) => {
      if (!youtubeId) {
        return;
      }

      set((state) => ({
        favoriteStatuses: {
          ...state.favoriteStatuses,

          [youtubeId]: liked,
        },

        liked: state.currentSong?.videoId === youtubeId ? liked : state.liked,
      }));
    },

    /* =====================================================
     * LOAD FAVORITE STATUS
     * =================================================== */

    loadFavoriteStatus: async (youtubeId) => {
      if (!isValidVideoId(youtubeId)) {
        return false;
      }

      const requestId = Date.now() + Math.random();

      set((state) => ({
        favoriteLoading: {
          ...state.favoriteLoading,

          [youtubeId]: true,
        },

        favoriteRequestIds: {
          ...state.favoriteRequestIds,

          [youtubeId]: requestId,
        },
      }));

      try {
        const liked = await isFavoriteSong(youtubeId);

        const latestRequestId = get().favoriteRequestIds[youtubeId];

        /*
         * Don't allow an old request
         * to overwrite a newer request.
         */
        if (latestRequestId !== requestId) {
          return get().favoriteStatuses[youtubeId] ?? false;
        }

        set((state) => ({
          favoriteStatuses: {
            ...state.favoriteStatuses,

            [youtubeId]: liked,
          },

          liked: state.currentSong?.videoId === youtubeId ? liked : state.liked,

          favoriteLoading: {
            ...state.favoriteLoading,

            [youtubeId]: false,
          },
        }));

        return liked;
      } catch (error) {
        console.error("Error checking favorite status:", error);

        set((state) => ({
          favoriteLoading: {
            ...state.favoriteLoading,

            [youtubeId]: false,
          },
        }));

        throw error;
      }
    },

    /* =====================================================
     * TOGGLE CURRENT FAVORITE
     * =================================================== */

    toggleCurrentFavorite: async () => {
      const { currentSong, favoriteSaving } = get();

      if (!currentSong || !isValidVideoId(currentSong.videoId)) {
        return false;
      }

      const youtubeId = currentSong.videoId;

      /*
       * Prevent duplicate requests
       * for the same song.
       */
      if (favoriteSaving[youtubeId]) {
        return get().favoriteStatuses[youtubeId] ?? false;
      }

      return get().toggleFavorite({
        title: currentSong.title,

        artist: currentSong.artist,

        youtubeId,
      });
    },

    /* =====================================================
     * TOGGLE ANY FAVORITE
     * =================================================== */

    toggleFavorite: async (song) => {
      const youtubeId = song.youtubeId;

      if (!isValidVideoId(youtubeId)) {
        return false;
      }

      const state = get();

      /*
       * Prevent double clicks while
       * this specific song is saving.
       */
      if (state.favoriteSaving[youtubeId]) {
        return state.favoriteStatuses[youtubeId] ?? false;
      }

      const previousValue = state.favoriteStatuses[youtubeId] ?? false;

      const nextValue = !previousValue;

      /*
       * Optimistic update.
       *
       * The UI changes immediately.
       */
      set((state) => ({
        favoriteStatuses: {
          ...state.favoriteStatuses,

          [youtubeId]: nextValue,
        },

        liked:
          state.currentSong?.videoId === youtubeId ? nextValue : state.liked,

        favoriteSaving: {
          ...state.favoriteSaving,

          [youtubeId]: true,
        },
      }));

      try {
        /*
         * Save/remove favorite in DB.
         */
        const result = await toggleFavoriteSong(song);

        const actualLiked = result.liked;

        /*
         * Use the actual database result.
         */
        set((state) => ({
          favoriteStatuses: {
            ...state.favoriteStatuses,

            [youtubeId]: actualLiked,
          },

          liked:
            state.currentSong?.videoId === youtubeId
              ? actualLiked
              : state.liked,

          /*
           * IMPORTANT:
           *
           * This is `favoriteSaving`.
           *
           * NOT `favoriteSavingIds`.
           */
          favoriteSaving: {
            ...state.favoriteSaving,

            [youtubeId]: false,
          },
        }));

        return actualLiked;
      } catch (error) {
        console.error("Error toggling favorite:", error);

        /*
         * Database failed.
         *
         * Roll back optimistic update.
         */
        set((state) => ({
          favoriteStatuses: {
            ...state.favoriteStatuses,

            [youtubeId]: previousValue,
          },

          liked:
            state.currentSong?.videoId === youtubeId
              ? previousValue
              : state.liked,

          favoriteSaving: {
            ...state.favoriteSaving,

            [youtubeId]: false,
          },
        }));

        throw error;
      }
    },

    /* =====================================================
     * CLEAR PLAYLIST
     * =================================================== */

    clearPlaylist: () => {
      set({
        playlist: null,

        currentSongIndex: -1,

        currentSong: null,

        isPlaying: false,

        progress: 0,

        duration: 0,

        seekTarget: null,

        liked: false,

        /*
         * Do NOT clear favoriteStatuses.
         *
         * Favorites belong to songs,
         * not playlists.
         */
      });
    },

    clearSeekTarget: () => {
      set({
        seekTarget: null,
      });
    },
  })
);
