<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack

Next.js 16 (App Router, `src/` layout) + React 19 + Tailwind v4. `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and the React Compiler. Verify framework behavior against the bundled docs above, not training data.

## Commands

- `npm run dev` / `npm run build` / `npm run lint` (ESLint flat config in `eslint.config.mjs`).
- No typecheck script exists: run `npx tsc --noEmit`.
- npm is the package manager (`package-lock.json` is authoritative; not pnpm/yarn/bun).

## Conventions

- Path alias `@/*` → `src/*`.
- Type page/layout/route props with the global Next 16 helpers (`PageProps<'/route'>`, `LayoutProps<'/route'>`, `RouteContext<'/route'>`) — globals, no import; don't hand-roll `params` typing.
- React Compiler is on: don't add `memo`/`useMemo`/`useCallback` for performance.
- shadcn/ui components are vendored in `src/components/ui/` (style `base-nova`, config in `components.json`). Add components with `npx shadcn add <name>`; don't hand-edit vendored files.
- `cn` is the `cn` npm package, re-exported by `src/lib/utils.ts` (not clsx + tailwind-merge).
- Tailwind v4 is CSS-first: no `tailwind.config`; theme tokens live in `src/app/globals.css`, processed via the `@tailwindcss/turbopack` loader rule in `next.config.ts`.
- `cacheComponents: true` changes data fetching/caching rules vs classic Next — see `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`.

## Codebase notes

- `src/lib/highlighter.tsx` lazily loads Shiki languages/themes; to support a new language or alias, add it to the `languages`/`aliases` maps there.
