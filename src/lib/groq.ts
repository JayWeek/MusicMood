import Groq from "groq-sdk";

if (!process.env.MUSIC_MOOD_GROQ_API_KEY) {
  throw new Error("MUSIC_MOOD_GROQ_API_KEY is not defined.");
}

export const groq = new Groq({
  apiKey: process.env.MUSIC_MOOD_GROQ_API_KEY,
});