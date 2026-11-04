# Explanation - Pokédex

**Route:** Pokédex. **Tools:** Claude Code (on claude.ai/code).

## 1. My technical choices

**What I save in SQLite: the favourites.** I save the favourites because the user makes them himself. The rest
(names, stats, pictures) can be loaded again from PokeAPI. For each favourite I only save the number and the name, and
the date to show the newest first. That is enough to show a card. The table is made in `src/services/database.ts:15`.
The code to read, add and remove favourites is in `src/services/favorites.ts:8`, `:14` and `:23`.

This changed during the project. With the offline issue (#14), the data from the API is also saved in SQLite, so the
app works without internet (`src/services/query-client.ts:4`).

**Native feature: vibration.** I chose the vibration instead of Share because you notice it more: you feel it when you
tap the heart. It is in `src/hooks/use-favorites.ts:52`. It only vibrates when the favourite is really saved (`:51`).
Share is still in the card menu (`src/components/pokemon-actions.ts:16`).

## 2. One feature from the API to the screen: search

PokeAPI cannot search. So the app loads all the names one time, and then it searches on the phone.

- The search screen (`src/app/search.tsx:18`) uses `usePokemonSearch`.
- This hook (`src/hooks/use-pokemon-search.ts`) loads all the names only one time (`:11`).
- It calls `GET /pokemon?limit=100000` (`src/services/pokemon-api.ts:44`).
- `filterPokemon` (`src/services/search.ts:6` and `:10`) makes the text lower case and keeps the names that have this
  text in them. So "pika" and "chu" both find Pikachu.
- While it loads, you see grey cards (`src/app/search.tsx:23-24`). If it fails, you see a message and a Retry button
  (`:26-27`). If nothing is found, you see "No Pokémon found" (`:30`).

## 3. Something from the agent that I changed

In issue #10, the agent made a small "pop" animation on the heart. I tested it on my iPhone and the animation was too
small: you could almost not see it. I told the agent. It made the heart grow more (1.6 instead of 1.3) and move
faster (`src/components/favorite-button.tsx:25-27`). I saw the problem by testing on my phone, not by reading the
code. Chat: `chat-history/issue-10-heart-pop.md` (line 188), commit `7ed4382`.

---

I did issues #1 to #7 in one chat. From issue #8, I used one chat for each issue (see `chat-history/`).
