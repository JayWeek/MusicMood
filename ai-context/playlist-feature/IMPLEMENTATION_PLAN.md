# AI Playlist Generation Feature Plan

## Goal
Enable users to submit a mood prompt and receive a structured playlist from the AI layer.

## Current implementation shape
- The UI collects a prompt on the generate screen and posts it to /api/playlists/generate.
- The API route validates the prompt and calls the playlist generator service.
- The playlist generator sends a request to Groq, validates the AI response, enriches songs with YouTube metadata, and returns a final playlist object.

## Key pipeline
1. Frontend form submits prompt to the generation API route.
2. Route parses and validates the request body.
3. Service constructs the Groq request payload and calls the model.
4. Service validates the model output as a draft playlist schema.
5. Service enriches each recommended song with YouTube metadata.
6. Service validates the final enriched playlist and returns it to the UI.
7. UI redirects to the playing experience with the generated playlist.

## Important constraints
- Keep the model selection unchanged unless the issue is clearly in the model integration.
- Preserve the current prompt-based experience.
- Do not change the feature contract unless the bug requires it.
- Maintain graceful handling for invalid JSON, unsupported structured-output modes, and enrichment failures.

## Relevant files
- src/app/api/playlists/generate/route.ts
- src/app/(dashboard)/generate/page.tsx
- src/components/generate/generate-page.tsx
- src/components/generate/generate-prompt.tsx
- src/lib/schema/playlist.schema.ts
- src/lib/services/playlist-generator.ts
- src/lib/services/youtube-enrichment.ts
- src/lib/groq.ts
- src/proxy.ts
