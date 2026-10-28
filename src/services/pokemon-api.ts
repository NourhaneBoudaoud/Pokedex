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

// More than the number of Pokémon, so one request returns every name.
const ALL_LIMIT = 100000;

function toSummary(result: NamedResource): PokemonSummary {
  return { id: getIdFromUrl(result.url), name: result.name };
}

export async function getPokemonPage(offset: number): Promise<PokemonPage> {
  const data = await apiGet<PokemonListResponse>(`/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
  return {
    items: data.results.map(toSummary),
    nextOffset: data.next ? offset + PAGE_SIZE : null,
  };
}

export async function getAllPokemon(): Promise<PokemonSummary[]> {
  const data = await apiGet<PokemonListResponse>(`/pokemon?limit=${ALL_LIMIT}`);
  return data.results.map(toSummary);
}
