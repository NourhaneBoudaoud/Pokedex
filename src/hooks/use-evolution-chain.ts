import { useQuery } from '@tanstack/react-query';

import { getEvolutionChain } from '@/services/pokemon-api';

// enabled: the detail screen only turns it on once the Evolution tab has been opened.
export function useEvolutionChain(speciesId: number | undefined, enabled: boolean) {
  return useQuery({
    queryKey: ['evolution', speciesId],
    queryFn: () => getEvolutionChain(speciesId ?? 0),
    enabled: enabled && speciesId !== undefined,
    staleTime: Infinity,
  });
}
