# VoiceTrace

A voice-first bug-to-issue workspace built with Next.js App Router, React, TypeScript, Tailwind CSS, and Lucide. This repository is the main VoiceTrace app, including the sandbox, external inspector, engineering tickets, suggested patches, GitHub handoff, and session history.

## Development

Requires Node.js 22.

```sh
npm ci
npm run dev
npm test
npm run typecheck
npm run build
```

## Vercel deployment

Import this repository into Vercel using the Next.js framework preset. Add `GEMINI_API_KEY` and optional `GEMINI_FALLBACK_API_KEY` as sensitive production environment variables, then deploy. Never commit real keys. `.env.example` lists supported names only.

Gemini tries the primary key first, then the backup. Missing keys, provider errors, or invalid output fall back to local deterministic analysis. Suggested code fixes are hypotheses for developer review.

## GitHub integration

Save an `owner/repository` name or GitHub repository URL in GitHub Settings. Without a token, a native link opens a pre-filled GitHub issue in a new tab for review and submission. A page-session token with Issues write permission enables direct creation. Repository selection is saved in sessionStorage; tokens stay in memory and are never embedded in URLs or browser storage.

## External inspection

Drag the bookmarklet from External Inspector to your bookmarks bar. Activate it on the target website before reproducing an error, describe the problem in its floating textarea, then select Review in VoiceTrace. The overlay imports URL, selector, subsequent console errors, viewport, and observation into this app. Its return origin is derived from the live deployment, so Vercel-generated bookmarklets return to Vercel.

Evidence is transported through URL query parameters. Review sensitive content before sharing. Some sites block bookmarklets; use manual capture if needed. Wispr Flow supplies OS-level dictation into text fields; sample rants and typing also work without it.

## Testing

The interactive checkout contains intentional promo, quantity, mobile layout, and contrast bugs. It never processes payments. The separate SneakerDrop external demo is maintained in the Demowebsite repository.
