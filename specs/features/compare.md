# Compare two Pokémon

## Goal

Put two Pokémon side by side and see who is stronger on each stat.

## Constraints

- Route `src/app/compare.tsx`. Opened from a "Compare" entry in the card menu, with that Pokémon in the left slot.
- Picking the other Pokémon reuses the search filter and the names query from [search](./search.md).
- Stats from `GET /pokemon/{id}` through the same hook as the detail screen (same cache).
- No Figma screen: same colours, font, cards, bars and spacing as the detail Stats tab.

## Acceptance Criteria

- [ ] Two slots at the top, each with sprite, name and number; tapping a slot lets me search and pick a Pokémon.
- [ ] For each of the six stats: both values and two bars; the higher value is in `primary` and bold,
  the lower one muted. A tie shows both as equal.
- [ ] A total row with the sum of the six stats, with the same highlight.
- [ ] Until both slots are filled, the screen says "Pick a second Pokémon".
- [ ] Loading and error with Retry for each Pokémon.

## Out of Scope

- More than two Pokémon.
- Type matchups or a battle result.
- Saving comparisons.
