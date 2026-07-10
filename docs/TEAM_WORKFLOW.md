# Team Workflow & Git Git Guidelines

This document outlines the branching strategy, commit requirements, and contribution guidelines for the **MusicMood** project. Adhering to these rules keeps our codebase clean and prevents deployment breaking changes.

---

## The Golden Rule

> **Never commit or push directly to the `main` branch.** All changes must go through a feature branch and a reviewed Pull Request.

---

## 🌿 Branching Strategy

Every developer must work on an isolated branch. Use descriptive prefixes based on the type of work you are doing:

- **`feature/`** — For new features or UI additions.
- **`fix/`** — For bug resolutions and patches.
- **`docs/`** — For documentation changes.
- **`refactor/`** — For code improvements without changing functionality.

### Examples:

- `feature/authentication`
- `feature/history`
- `feature/ui-generator`

---

## Daily Development Lifecycle

Always synchronize with the remote server before you begin writing code to avoid nasty merge conflicts later.

### 1. Starting a New Feature

```bash
# Switch to the main branch
git checkout main

# Pull the latest changes from remote
git pull origin main

# Create and switch to your new feature branch
git checkout -b feature/your-feature-name
```

---

## Pre-Commit Requirements

You must validate your code locally before saving your work. **Do not commit if either command fails.**

### 2. Before You Commit


Run these commands from the repository root:

```bash
npm run lint
npm run lint:fix
npm run type-check
npm run format
npm run format:check
npm run check
```

These commands cover the core standards:

- `lint` checks code quality with ESLint.
- `type-check` verifies TypeScript correctness.
- `format` applies Prettier formatting.
- `format:check` confirms formatting without changing files.
- `check` runs the full local validation suite in one command.

This keeps the repository consistent without introducing unnecessary complexity.

---

## Commit Message Standards

We use standard semantic prefixes to keep our repository history clean and easily readable.

### Format

```text
<type>: <short description in lowercase>
```

### Reference Examples

| Prefix         | Purpose                                         | Example                             |
| :------------- | :---------------------------------------------- | :---------------------------------- |
| **`feat`**     | Introducing a brand new feature                 | `feat: add login page`              |
| **`fix`**      | Resolving a bug or broken behavior              | `fix: resolve audio playback bug`   |
| **`docs`**     | Updating Markdown files or code comments        | `docs: update architecture`         |
| **`refactor`** | Cleaning up or restructuring code               | `refactor: simplify playlist state` |
| **`style`**    | Tweaking visual layouts, CSS, or formatting     | `style: improve sidebar layout`     |
| **`chore`**    | Updating packages, config files, or build tools | `chore: update dependencies`        |

---

## Pull Request Checklist

Before opening a Pull Request to merge back into `main`, confirm that:

- [ ] Your branch is up to date with the latest `main`.
- [ ] Your local linter and type-checker both pass successfully.
- [ ] Your commit messages follow the semantic rules above.
