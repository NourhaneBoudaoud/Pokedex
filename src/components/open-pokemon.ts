import { router } from 'expo-router';

import type { PokemonSummary } from '@/services/pokemon';

// Every way into a detail screen: grid cards, the card menu, evolution cards.
export function openPokemon(pokemon: PokemonSummary) {
  router.push({ pathname: '/pokemon/[id]', params: { id: String(pokemon.id) } });
}
