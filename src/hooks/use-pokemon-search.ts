import { useQuery } from '@tanstack/react-query';

import { getAllPokemon } from '@/services/pokemon-api';
import { filterPokemon } from '@/services/search';

export function usePokemonSearch(text: string) {
  const query = useQuery({
    queryKey: ['pokemon', 'all'],
    queryFn: getAllPokemon,
    // The list of names does not change during a session.
    staleTime: Infinity,
  });

  const results = query.data ? filterPokemon(query.data, text) : [];

  return { ...query, results };
}
