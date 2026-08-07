import type { SearchResult } from "yt-search";

export async function enrichSongsWithYouTube(searchQuery: string) {
  const importedYtSearch = await import("yt-search");
  const ytSearch = (
    importedYtSearch as {
      default: (query: string | { query: string }) => Promise<SearchResult>;
    }
  ).default;

  const result = await ytSearch(searchQuery);
  const video = result.videos?.[0];

  const thumbnail = typeof video?.thumbnail === "string" ? video.thumbnail : "";

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

