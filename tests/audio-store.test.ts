import assert from "node:assert/strict";
import test from "node:test";

import { useAudioStore } from "../src/stores/audioStore";

test("setPlaylist, next, and previous update the active song", () => {
  useAudioStore.setState(useAudioStore.getInitialState());

  useAudioStore.getState().setPlaylist({
    title: "Test Playlist",
    description: "A test playlist",
    mood: ["focus"],
    songs: [
      {
        title: "First Song",
        artist: "Artist One",
        videoId: "first-video",
        thumbnail: "thumb-1",
        duration: "3:12",
      },
      {
        title: "Second Song",
        artist: "Artist Two",
        videoId: "second-video",
        thumbnail: "thumb-2",
        duration: "2:45",
      },
    ],
  });

  assert.equal(useAudioStore.getState().currentSong?.title, "First Song");

  useAudioStore.getState().next();
  assert.equal(useAudioStore.getState().currentSong?.title, "Second Song");

  useAudioStore.getState().previous();
  assert.equal(useAudioStore.getState().currentSong?.title, "First Song");

  useAudioStore.getState().selectSong(1);
  assert.equal(useAudioStore.getState().currentSong?.title, "Second Song");
  assert.equal(useAudioStore.getState().isPlaying, true);

  useAudioStore.getState().setDuration(165);
  useAudioStore.getState().next();
  assert.equal(useAudioStore.getState().isPlaying, false);
  assert.equal(useAudioStore.getState().duration, 165);

  useAudioStore.getState().cycleRepeatMode();
  useAudioStore.getState().next();
  assert.equal(useAudioStore.getState().currentSong?.title, "First Song");

  useAudioStore.getState().cycleRepeatMode();
  useAudioStore.getState().next();
  assert.equal(useAudioStore.getState().currentSong?.title, "First Song");
  assert.equal(useAudioStore.getState().seekTarget, 0);

  useAudioStore.getState().cycleRepeatMode();
  useAudioStore.getState().toggleShuffle();
  useAudioStore.getState().next();
  assert.equal(useAudioStore.getState().currentSong?.title, "Second Song");
});
