type YouTubeVideoSearchResult = {
  videoId?: string;
  thumbnail?: string | { url?: string };
  duration?: string | number;
};

type YouTubeSearchResponse = {
  videos?: YouTubeVideoSearchResult[];
};

export async function enrichSongsWithYouTube(searchQuery: string) {
  const ytSearch = (await import("yt-search")).default as (
    query: string,
  ) => Promise<YouTubeSearchResponse>;

  const result = await ytSearch(searchQuery);
  const video = result.videos?.[0] as any; // Cast temporarily or use strict library types

  const thumbnail =
    typeof video?.thumbnail === "string"
      ? video.thumbnail
      : video?.thumbnail?.url ?? "";

  // FIX: Extract the human-readable timestamp from the duration object
  let formattedDuration = "unknown";
  if (video?.duration) {
    if (typeof video.duration === "string") {
      formattedDuration = video.duration;
    } else if (typeof video.duration === "object" && video.duration.timestamp) {
      formattedDuration = video.duration.timestamp;
    } else if (typeof video.duration.toString === "function") {
      formattedDuration = video.duration.toString();
    }
  }

  return {
    videoId: video?.videoId ?? "",
    thumbnail,
    duration: formattedDuration,
  };
}

