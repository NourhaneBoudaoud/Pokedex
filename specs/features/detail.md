# Pokémon detail

## Goal

Open a Pokémon and read everything about it: what it is, how strong it is and what it evolves into.

## Constraints

- Route `src/app/pokemon/[id].tsx`, reachable from list, search, favorites and evolution cards.
- `GET /pokemon/{id}` for the main data; `GET /pokemon-species/{id}` then `GET /evolution-chain/{id}` for the
  Evolution tab, fetched only when that tab is opened.
- Artwork: `sprites.other["official-artwork"].front_default`.
- Tabs are local state on the same screen, not routes, so switching is instant.
- Design: `docs/design/Detail.png`, `Detail-1.png`, `Detail-2.png`, `Detail-scroll.png`.

## Acceptance Criteria

- [ ] Header: back arrow, heart, name, number ("#001"), one pill per type with the type colour dot, artwork.
- [ ] About: Name, ID, Base (XP), Weight (kg), Height (m), Types, Abilities.
- [ ] Stats: HP, Attack, Defense, Special Attack, Special Defense, Speed, each with its value and a bar
  (full bar = 255).
- [ ] Evolution: the chain as cards (sprite, badge, name) linked by a dotted line; tapping one opens its detail.
  Branches (Eevee) are listed one after the other.
- [ ] Scrolling down shows a compact header with the name centred.
- [ ] Loading and error with Retry for the Pokémon and, separately, for the evolution chain.

## Out of Scope

- The heart's behaviour (see [favorites](./favorites.md)). Until then it is shown but does nothing.
- Moves, locations, flavour text, gender, shiny artwork.
- Evolution conditions (level, item, ...).
