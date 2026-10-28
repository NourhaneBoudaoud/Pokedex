import { useInfiniteQuery } from '@tanstack/react-query';

import { getPokemonPage } from '@/services/pokemon-api';

export function usePokemonList() {
  const query = useInfiniteQuery({
    queryKey: ['pokemon', 'list'],
    queryFn: ({ pageParam }) => getPokemonPage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });

  const pokemon = query.data?.pages.flatMap((page) => page.items) ?? [];

  return { ...query, pokemon };
}
