import { router } from 'expo-router';

import type { PokemonSummary } from '@/services/pokemon';

// Every way into a detail screen: grid cards, the card menu, evolution cards.
export function openPokemon(pokemon: PokemonSummary) {
  router.push({ pathname: '/pokemon/[id]', params: { id: String(pokemon.id) } });
}

// The card menu's "Compare": that Pokémon goes in the left slot.
export function openCompare(pokemon: PokemonSummary) {
  router.push({ pathname: '/compare', params: { left: String(pokemon.id) } });
}
