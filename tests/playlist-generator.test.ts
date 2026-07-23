import assert from "node:assert/strict";
import test from "node:test";

process.env.MUSIC_MOOD_GROQ_API_KEY = "test-key";

const { generatePlaylistFromPrompt } = require("../src/lib/services/playlist-generator");

test("generatePlaylistFromPrompt accepts a draft payload and enriches songs", async () => {
  const fakeClient = {
    chat: {
      completions: {
        create: async () => ({
          choices: [
            {
              message: {
                content: JSON.stringify({
                  playlist: {
                    title: "Calm Focus",
                    description: "Gentle and steady",
                    mood: ["calm"],
                    songs: [
                      { title: "Clair de lune", artist: "Debussy" },
                      { title: "Weightless", artist: "Marconi Union" },
                      { title: "Satin Sheets", artist: "The Mamas & the Papas" },
                      { title: "River Flows in You", artist: "Yiruma" },
                      { title: "Moon River", artist: "Henry Mancini" },
                      { title: "A Thousand Years", artist: "Christina Perri" },
                      { title: "Dreams", artist: "Fleetwood Mac" },
                    ],
                  },
                }),
              },
            },
          ],
        }),
      },
    },
  } as any;

  const result = await generatePlaylistFromPrompt("calm focus", {
    client: fakeClient,
    maxAttempts: 1,
    enrichSongs: async (searchQuery: string) => ({
      videoId: `video-${searchQuery}`,
      thumbnail: "thumb",
      duration: "3:12",
    }),
  });

  assert.equal(result.playlist.songs.length, 7);
  assert.ok(result.playlist.songs[0].videoId);
  assert.ok(result.playlist.songs[0].thumbnail);
  assert.ok(result.playlist.songs[0].duration);
});

test("generatePlaylistFromPrompt falls back when structured JSON mode is unsupported", async () => {
  let attempts = 0;
  const fakeClient = {
    chat: {
      completions: {
        create: async () => {
          attempts += 1;
          if (attempts === 1) {
            throw new Error("response_format is not supported by this model");
          }

          return {
            choices: [
              {
                message: {
                  content: JSON.stringify({
                    playlist: {
                      title: "Midnight Focus",
                      description: "Steady and reflective",
                      mood: ["focus"],
                      songs: [
                        { title: "Clair de lune", artist: "Debussy" },
                        { title: "Weightless", artist: "Marconi Union" },
                        { title: "Satin Sheets", artist: "The Mamas & the Papas" },
                        { title: "River Flows in You", artist: "Yiruma" },
                        { title: "Moon River", artist: "Henry Mancini" },
                        { title: "A Thousand Years", artist: "Christina Perri" },
                        { title: "Dreams", artist: "Fleetwood Mac" },
                      ],
                    },
                  }),
                },
              },
            ],
          };
        },
      },
    },
  } as any;

  const result = await generatePlaylistFromPrompt("focus and calm", {
    client: fakeClient,
    maxAttempts: 1,
    enrichSongs: async () => ({
      videoId: "fallback-video",
      thumbnail: "fallback-thumb",
      duration: "3:12",
    }),
  });

  assert.equal(attempts, 2);
  assert.equal(result.playlist.songs.length, 7);
});
