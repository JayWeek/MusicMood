# MusicMood Project Overview

## Purpose

MusicMood is an AI-powered web application that turns a short description of a mood, activity, or atmosphere into a personalized playlist. Instead of forcing users to browse genres, artists, or decades manually, the experience is centered on natural language input and instant listening.

The product is designed for a senior-level web project with a strong emphasis on clean architecture, polished UX, and a clear split between UI, business logic, and external integrations.

---

## Product Summary

MusicMood helps a user say things like:

- “I want something calm and cinematic for studying.”
- “I need a high-energy playlist for a workout.”
- “Make me a nostalgic playlist for a rainy evening.”

The app then:

1. Accepts the prompt.
2. Sends it to an AI service for playlist generation.
3. Resolves songs into playable metadata.
4. Presents the playlist in-app.
5. Stores the result for future playback.

---

## Core Goals

MusicMood exists to deliver four primary outcomes:

- Make playlist creation feel effortless and conversational.
- Deliver a polished experience that feels premium despite being built within a short timeline.
- Keep the codebase organized so multiple developers can contribute safely.
- Provide a strong demo-ready product with authentication, generation, playback, history, and deployment in place.

---

## Target User

The primary user is someone who wants music quickly, without spending time curating playlists manually. They may be:

- studying or working
- exercising
- relaxing at home
- traveling
- looking for music that fits a mood rather than a specific artist

The experience should feel fast, intuitive, and low-friction.

---

## Core User Journey

1. A user lands on the app and creates or signs into an account.
2. The user enters a mood-based prompt.
3. The app generates a playlist based on that prompt.
4. The playlist is shown with song details and playback controls.
5. The user can continue listening while navigating the app.
6. Past playlists are saved so the user can replay them later.

---

## Core Features

### 1. Authentication and account access

Users can create an account, sign in, stay signed in, and access protected app areas. Authentication is handled securely through Supabase.

### 2. AI playlist generation

Users submit a prompt and receive a generated playlist that matches the mood or activity described. The AI layer is responsible for producing a structured response that can be validated and displayed.

### 3. In-app audio playback

Generated songs are resolved into playable media and presented through a global audio player. Playback should continue across navigation and remain consistent while the user moves through the app.

### 4. Playlist history

Every generated playlist is saved so users can revisit and replay previous results from their account.

### 5. Polished experience and deployment

The app should feel responsive, visually consistent, and reliable enough for demonstration and deployment.

---

## Product Scope

### In scope

- Sign-up and sign-in flows
- Protected routes and authenticated user access
- Prompt-based playlist generation
- Playlist display and playback
- Playlist saving and history
- Responsive UI and polished interactions
- Deployment-ready production setup

### Out of scope

- Social sharing or public playlists
- Manual playlist editing by the user
- Offline audio playback
- Native mobile apps
- Subscription tiers or premium features

---

## Product Principles

The implementation should follow these principles:

- Simplicity first: the user should focus on the prompt and the music, not the interface.
- Clear separation of concerns: UI, business logic, and external integrations must remain distinct.
- Reliability over complexity: the app should fail gracefully when a song cannot be resolved.
- Demo quality: the experience should feel intentional, polished, and complete.

---

## Technical Direction

The project is built as a Next.js application using the App Router and TypeScript. The implementation is organized around a layered architecture so each concern has a clear home.

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion for transitions
- Zustand for shared state
- React Player for playback

### Backend and services

- Next.js route handlers for API endpoints
- Supabase for authentication and persistence
- Groq for AI-generated playlist content
- YouTube-based resolution for media metadata
- Zod for request and response validation

### Architecture approach

The application should follow a simple flow:

1. The client collects user input.
2. The app sends a request to a server route.
3. The server validates the input and delegates work to a service layer.
4. The service coordinates AI and media resolution steps.
5. The final playlist result is returned to the UI and saved if appropriate.

---

## Recommended Project Structure

The repository should remain organized in a predictable way:

- src/app for routes and page-level entry points
- src/components for reusable UI blocks
- src/hooks for reusable client-side logic
- src/stores for shared state such as playback and UI state
- src/services for business workflows and feature orchestration
- src/lib for integrations with external services
- src/types for shared contracts
- src/styles for reusable styling support



## Data Model

The application should use a simple relational structure:

### Users

Represents the authenticated user account. This is managed through Supabase Auth.

### Playlists

Represents a generated playlist owned by a single user.

### Playlist songs

Represents each song included in a playlist. Each record should contain the title, artist, playback metadata, and the position within the playlist.

This model supports user ownership, playlist persistence, and reliable replay later.

---

## Definition of Success

The project is successful when a user can:

- create an account and sign in securely
- describe a mood or activity in natural language
- receive a playlist that matches the request
- listen to the playlist inside the app
- revisit previous playlists from their account
- navigate the app without breaking the playback experience

---

## Implementation Expectations

The product should be treated as a cohesive system, not as a collection of unrelated features. Each feature should support the larger experience:

- Authentication creates a secure foundation.
- Playlist generation is the core value proposition.
- Playback makes the result usable.
- History makes the experience persistent.
- Polish and deployment make it presentation-ready.

This document is the single source of truth for the product direction. Any implementation work should support the goals described here.
