import { apiGet } from '@/services/api-client';
import { getIdFromUrl, type PokemonSummary } from '@/services/pokemon';

export const PAGE_SIZE = 20;

type NamedResource = {
  name: string;
  url: string;
};

type PokemonListResponse = {
  count: number;
  next: string | null;
  results: NamedResource[];
};

export type PokemonPage = {
  items: PokemonSummary[];
  nextOffset: number | null;
};

export async function getPokemonPage(offset: number): Promise<PokemonPage> {
  const data = await apiGet<PokemonListResponse>(`/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
  return {
    items: data.results.map((result) => ({ id: getIdFromUrl(result.url), name: result.name })),
    nextOffset: data.next ? offset + PAGE_SIZE : null,
  };
}
