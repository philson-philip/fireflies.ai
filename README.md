# Fireflies — Meeting Detail, redesigned

Design Engineer task. An improved version of the Fireflies **meeting / transcript detail** view, built on a bespoke, token-driven design system. Frontend only, mock data, no backend.

**Stack:** React 18 · JavaScript · Vite · Tailwind CSS · lucide-react (icons only)

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
npm run preview  # serve the build
```

## Deploy (Vercel)

Framework preset **Vite**, build command `npm run build`, output `dist`. No env vars.

---

## Why the transcript view

The home/dashboard didn't expose enough surface to judge meaningfully; the meeting/transcript view is the core surface of a note-taker and where design craft is most visible, so it's the highest-signal screen to audit and rebuild.

## What changed (selected)

- **Transcript is primary and never clips.** Panes use `min-width: 0` with normal wrapping, so text re-justifies live as the pane is resized (the live app clips text at some widths and doesn't reflow on resize).
- **Resizable transcript** via an accessible separator (pointer + arrow keys).
- **Consistent panel width.** The left panel is a fixed 320px for every tab, so switching tabs no longer shifts the layout.
- **Grouped speaker turns.** Consecutive turns by one speaker share a single header instead of repeating it per line.
- **Semantic "now playing".** The active line uses a brand tint, not red.
- **Accessible chrome.** Header and rail are real `header`/`nav`/`button` landmarks, keyboard-focusable, with visible focus rings (the live app renders these as generic, non-focusable divs).
- **Every icon control is labelled** (tooltip + `aria-label`) with a responsive tooltip delay.
- **Toasts** are corner-anchored and color-coded by semantic variant.
- **Accessible semantic colors.** Success/warning/danger/info are tuned for WCAG AA on white (the live app uses teal for "success", which fails as text).

## Design system

Anchored in the Fireflies brand (purple `#7A5AF8`, DM Sans + Inter, 4px rhythm) but owned here and implemented from scratch — no third-party UI kit.

- **Tokens:** `src/index.css` (CSS variables) → surfaced into Tailwind in `tailwind.config.js`. Structured so a dark theme is a drop-in.
- **Primitives:** `src/components/ui/` — `Button` (primary/secondary/ghost + disabled), `Input` (label/helper/error), `Card`, `Badge` (semantic tones), `Avatar`, `IconButton`, `Tooltip`, `Toast`.
- **Feature components:** `src/components/meeting/`.
- **Mock data:** `src/data/meeting.js`.

## Part 1 audit

> Paste the consolidated audit (product judgment, 8–10 craft items, systems thinking, accessibility) here.

## Trade-offs

> Note what was deliberately scoped out and why.
