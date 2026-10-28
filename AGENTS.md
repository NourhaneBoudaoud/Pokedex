# Pokédex

A Pokédex app that follows the course Figma design, on the public PokeAPI (`https://pokeapi.co/api/v2`, no key).
Product: `specs/product.md`. Design tokens and layout: `specs/design.md`, screen exports in `docs/design/` (PNG to look at, SVG for exact values).
Features: one file per feature in `specs/features/`, one GitHub issue each.

- Expo SDK 58, Expo Router, TanStack Query, expo-sqlite, expo-haptics. Must run in Expo Go: no library that needs a development build.
- Screens in `src/app/`, data through hooks in `src/hooks/`, API and SQL in `src/services/`, reusable UI in `src/components/`.
  A screen shows, a hook fetches, a service talks to the API or the database: none of them does two of these jobs.
- Colours (including type colours), spacing and font names only from `src/constants/theme.ts`. No hex value or magic number in a screen or component.
- Fonts: Cabinet Grotesk for big titles, Rubik for the rest (see `specs/design.md`), files in `assets/fonts/`, loaded with Expo Font.
- TypeScript strict. No `any`, no `as` casts (`as const` is fine), no `@ts-ignore`, no `console.log`. ESLint enforces these.
- Tested on an iPhone in Expo Go: follow the iOS variants of the design (`ActionSheetIOS`, safe area), keep it working on Android.
  Do not upgrade the Expo SDK: Expo Go from the App Store only runs the latest one.
- ESLint stays on version 9 (ESLint 10 breaks the React plugin).

## Shared setup

Reuse what is listed here, never add a second one. When you set up something new that other features will use,
add a line here: what it is and where it lives.

- Theme: `src/constants/theme.ts`. `colors`, `typeColors` + `getTypeColor(name)` (PokeAPI type name), `spacing`,
  `radius`, `shadow` (cards and search field), `fontFamily`, `fontSize`.
- Fonts: `src/hooks/use-app-fonts.ts`, called once in `src/app/_layout.tsx`, which holds the splash until they are loaded.
  Use `fontFamily.*` in styles, never a font name as a string.
- API client: `src/services/api-client.ts`, `apiGet<T>(path)`. Every PokeAPI request goes through it; it throws `ApiError`.
- Pokémon helpers: `src/services/pokemon.ts` (`PokemonSummary`, `getIdFromUrl`, `getSpriteUrl`, `formatNumber`, `formatName`).
- Query client: `src/services/query-client.ts`, provided in `src/app/_layout.tsx`.
- Icons: `@expo/vector-icons/MaterialIcons` (same set as the Figma), sizes from `iconSize`.
- UI: `PokemonGrid` (`src/components/pokemon-grid.tsx`, 2 columns of `PokemonCard`, tap → detail, ⋮ → card menu) for every
  grid of Pokémon, `ErrorState` (message + Retry, `compact` for the end of a list) for every failed load,
  `BackButton`, `SearchField` (home, opens search) and `SearchInput` (real input with back arrow).
- Search: `usePokemonSearch(text)` (`src/hooks/use-pokemon-search.ts`) loads every name once per session and filters with
  `filterPokemon` (`src/services/search.ts`). Reuse it wherever a Pokémon is picked by name.
- Loading: never a spinner on an empty screen. Every load shows placeholders in the shape of the content:
  `Skeleton` (`src/components/skeleton.tsx`, pulsing block), `PokemonGridSkeleton`, `PokemonCardSkeleton`,
  `DetailSkeleton`. Every Pokémon image goes through `RemoteImage` (placeholder until loaded, then a fade-in).
- Detail data: `usePokemonDetail(id)` (`src/hooks/use-pokemon-detail.ts`, `PokemonDetail` with types and stats) and
  `useEvolutionChain(speciesId, enabled)`. Reuse them instead of fetching a Pokémon again (same cache).
- Navigation: `openPokemon(pokemon)` (`src/components/open-pokemon.ts`) is the only way into a detail screen.
- Detail UI: `NumberBadge`, `TypePill`, `DetailTabs`, `AboutTab`, `StatsTab`, `EvolutionTab`; stat bars use `statBarRatio`.
- Card menu: `showPokemonActions(pokemon, handlers)` in `src/components/pokemon-actions.ts` (`ActionSheetIOS`, `Alert` on Android).
  New menu entries go there.

## Working on an issue

1. Read the issue and its spec file in `specs/features/` before planning.
2. Build only what the Acceptance Criteria ask. Anything in Out of Scope stays out, even if it looks easy.
3. Before you write code: post a plan (which files, how, what you are unsure about) and a `- [ ]` task list as
   one comment on the issue with `gh issue comment`. Wait for my go.
4. Tick off tasks with `gh issue comment --edit-last` while you build.
5. Run `npx expo lint` and `npx tsc --noEmit` before you say a task is done. Both must pass.
6. One commit per issue, message ending with `closes #N`.
7. No AI attribution anywhere: no "Generated with Claude Code", no `Co-Authored-By` or session link in commits,
   issues, comments, pull requests or files.

This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
