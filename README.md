# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Design system

Shared with the CuspAI app, so the two never drift.

One colour family: deep blue-teal, light and dark. There is no green and no second hue. A
green-led palette was tried in November 2026 and dropped the same day.

| Role                   | Dark                            | Light                |
| ---------------------- | ------------------------------- | -------------------- |
| Ground                 | deep blue-black                 | cool near-white      |
| Accent and main button | sea blue                        | deep teal-navy       |
| Logo                   | `#4fb3c4`, `#7fd2de`, `#2b8496` | `#0d4a53`, `#197785` |

- Tokens live at the top of `src/styles.css`. Use them through Tailwind (`bg-surface`,
  `text-accent-text`, `btn btn-primary`), and do not write a colour in a component.
- Headings are Outfit at weight 500. Body text is Figtree.
- The site opens dark. A visitor who picks light keeps it.
- The logo is drawn inline in `src/components/logo.tsx` and takes its colours from the
  `--logo-*` variables. Files for use elsewhere are in `public/brand`.
- Motion is transform and opacity only, and everything rests in its final state under
  `prefers-reduced-motion`.

## Screenshots and the guided demo

Every image in `public/screens` is a capture of the real app, in both themes.
`scripts/capture-screenshots.mjs` exports nothing itself: you export the app for the web, and the
script clicks through it and records where each control sits. Those positions feed
`src/lib/tour-data.ts`, which is what lets the demo's cursor land on the real buttons. The steps
are in the header of the script.

## Copy

Plain English. No em dashes, no "it's not X, it's Y", no jargon. Every number on the site has a
named source, and every feature described is in the app today. Prices come from
`src/lib/pricing.ts`, which mirrors the app's `data/pricing.ts`.
