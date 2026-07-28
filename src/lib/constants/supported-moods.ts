export const SUPPORTED_MOODS = [
  "euphoric",
  "happy",
  "party",
  "romantic",
  "chill",
  "dreamy",
  "sleepy",
  "focused",
  "motivated",
  "nostalgic",
  "melancholy",
  "heartbroken",
  "confident",
  "workout",
  "angry",
] as const;

export type SupportedMood = (typeof SUPPORTED_MOODS)[number];