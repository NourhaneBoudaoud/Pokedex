import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';

import { addFavorite, getFavorites, removeFavorite } from '@/services/favorites';
import type { PokemonSummary } from '@/services/pokemon';

const FAVORITES_KEY = ['favorites'];

export function useFavorites() {
  const query = useQuery({
    queryKey: FAVORITES_KEY,
    queryFn: getFavorites,
    // Only this app writes the table, and every write refreshes the query.
    staleTime: Infinity,
  });

  const ids = new Set(query.data?.map((pokemon) => pokemon.id));
  const isFavorite = (id: number) => ids.has(id);

  return { ...query, favorites: query.data ?? [], isFavorite };
}

type Toggle = {
  pokemon: PokemonSummary;
  // The state before the tap: true removes, false adds.
  favorite: boolean;
};

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pokemon, favorite }: Toggle) =>
      favorite ? removeFavorite(pokemon.id) : addFavorite(pokemon),
    // Optimistic update: the heart and the list change at once, before the database has answered.
    onMutate: async ({ pokemon, favorite }: Toggle) => {
      await queryClient.cancelQueries({ queryKey: FAVORITES_KEY });
      const previous = queryClient.getQueryData<PokemonSummary[]>(FAVORITES_KEY);
      queryClient.setQueryData<PokemonSummary[]>(FAVORITES_KEY, (current = []) =>
        favorite
          ? current.filter((item) => item.id !== pokemon.id)
          : [{ id: pokemon.id, name: pokemon.name }, ...current],
      );
      return { previous };
    },
    // The write failed: put the list back as it was.
    onError: (_error, _toggle, context) => {
      queryClient.setQueryData(FAVORITES_KEY, context?.previous);
    },
    // Only buzz when the database write really worked.
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: FAVORITES_KEY }),
  });
}
