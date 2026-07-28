// types/yt-search.d.ts
declare module "yt-search" {
  export interface VideoSearchResult {
    type: "video";
    videoId: string;
    url: string;
    title: string;
    description: string;
    image: string;
    thumbnail: string;
    seconds: number;
    timestamp: string;
    duration: {
      seconds: number;
      timestamp: string;
    };
    views: number;
    author: {
      name: string;
      url: string;
    };
  }

  export interface SearchResult {
    videos: VideoSearchResult[];
  }

  // Define ytSearch as a function with properties attached
  function ytSearch(query: string | { query: string }): Promise<SearchResult>;

  // Tells TypeScript that the module itself IS the function
  export = ytSearch;
}
