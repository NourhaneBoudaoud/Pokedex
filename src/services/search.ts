import type { PokemonSummary } from '@/services/pokemon';

// PokeAPI has no search endpoint: the search screen filters the full list of names on the phone.
// "PIKA" and "chu" both match "pikachu". Results are in Pokédex order. Empty text matches nothing.
export function filterPokemon(pokemon: PokemonSummary[], text: string): PokemonSummary[] {
  const query = text.trim().toLowerCase();
  if (query === '') {
    return [];
  }
  return pokemon.filter((item) => item.name.includes(query)).sort((a, b) => a.id - b.id);
}
