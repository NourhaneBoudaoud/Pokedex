# Search by name

## Goal

Type part of a name and see matching Pokémon at once, including ones I have not scrolled to.

## Constraints

- Own screen, `src/app/search.tsx`, opened from the search field on the home screen. No bottom tabs there.
- PokeAPI has no search endpoint. Fetch every name once with `GET /pokemon?limit=100000`
  (`staleTime: Infinity`) and filter on the phone. The filter is a pure function in `src/services/` so it can be tested.
- Reuse the list card. Design: `docs/design/Search.png` to `Search-2.png`.

## Acceptance Criteria

- [ ] The field is focused when the screen opens; the search icon becomes a back arrow that goes back.
- [ ] Results update while typing, from the first letter.
- [ ] Part of the name in any case matches: "PIKA" and "chu" both find Pikachu.
- [ ] Results are the same cards as the list, in Pokédex order.
- [ ] No match shows "No Pokémon found for "<text>"".
- [ ] Loading state while the names load; a failure shows a message and a Retry button.

## Out of Scope

- Search by number or type.
- Search history or suggestions.
- Fuzzy matching (typos).
