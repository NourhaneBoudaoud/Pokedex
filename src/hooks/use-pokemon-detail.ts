import { useQuery } from '@tanstack/react-query';

import { getPokemon } from '@/services/pokemon-api';

export function usePokemonDetail(id: number) {
  return useQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => getPokemon(id),
    enabled: Number.isInteger(id) && id > 0,
  });
}
