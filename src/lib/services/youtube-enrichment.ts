import type { SearchResult } from "yt-search";

function extractYouTubeId(candidate?: string | null): string {
  if (!candidate) return "";

  const trimmed = candidate.trim();

  // If it's already an 11-char YouTube ID
  if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);

    // youtu.be short links
    if (url.hostname === "youtu.be") {
      const id = url.pathname.slice(1);
      if (/^[A-Za-z0-9_-]{11}$/.test(id)) return id;
    }

    // youtube.com links
    if (url.hostname.endsWith("youtube.com")) {
      const v = url.searchParams.get("v");
      if (v && /^[A-Za-z0-9_-]{11}$/.test(v)) return v;
    }
  } catch {
    // not a URL, fall through
  }

  // If candidate contains a v= pattern anywhere, try to extract
  const vMatch = candidate.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (vMatch && vMatch[1]) return vMatch[1];

  // Last resort: try to find 11-char substring
  const idMatch = candidate.match(/([A-Za-z0-9_-]{11})/);
  return idMatch ? idMatch[1] : "";
}

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

  // Extract a usable video id from either the `videoId` field or the `url`.
  const rawId = video?.videoId ?? (typeof video?.url === "string" ? video.url : "");
  const videoId = extractYouTubeId(rawId);

  // Extract human-readable duration
  let formattedDuration = "unknown";
  if (video?.duration) {
    if (typeof video.duration === "string") {
      formattedDuration = video.duration;
    } else if (typeof video.duration === "object" && (video.duration as any).timestamp) {
      formattedDuration = (video.duration as any).timestamp;
    } else if (typeof (video.duration as any)?.toString === "function") {
      try {
        formattedDuration = String((video.duration as any).toString());
      } catch {
        formattedDuration = "unknown";
      }
    }
  }

  return {
    videoId: videoId ?? "",
    thumbnail,
    duration: formattedDuration,
  };
}

