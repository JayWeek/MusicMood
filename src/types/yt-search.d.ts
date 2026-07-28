declare module "yt-search" {
  export interface YouTubeVideoSearchResult {
    videoId?: string;
    thumbnail?: string | { url?: string };
    duration?: string | number | { timestamp?: string };
  }

  export interface YouTubeSearchResponse {
    videos?: YouTubeVideoSearchResult[];
  }

  const ytSearch: (query: string) => Promise<YouTubeSearchResponse>;
  export default ytSearch;
}
