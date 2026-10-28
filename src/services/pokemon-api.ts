import { apiGet } from '@/services/api-client';
import {
  flattenChain,
  getIdFromUrl,
  type ChainLink,
  type PokemonDetail,
  type PokemonSummary,
} from '@/services/pokemon';

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

// Only the fields the app reads from GET /pokemon/{id}.
type PokemonResponse = {
  id: number;
  name: string;
  base_experience: number | null;
  height: number;
  weight: number;
  species: NamedResource;
  types: { slot: number; type: NamedResource }[];
  stats: { base_stat: number; stat: NamedResource }[];
  abilities: { is_hidden: boolean; slot: number; ability: NamedResource }[];
  sprites: { other?: { 'official-artwork'?: { front_default: string | null } } };
};

export async function getPokemon(id: number): Promise<PokemonDetail> {
  const data = await apiGet<PokemonResponse>(`/pokemon/${id}`);
  return {
    id: data.id,
    name: data.name,
    speciesId: getIdFromUrl(data.species.url),
    types: data.types.map((entry) => entry.type.name),
    stats: data.stats.map((entry) => ({ name: entry.stat.name, value: entry.base_stat })),
    heightDm: data.height,
    weightHg: data.weight,
    baseExperience: data.base_experience,
    abilities: [...data.abilities].sort((a, b) => a.slot - b.slot).map((entry) => entry.ability.name),
    artworkUrl: data.sprites.other?.['official-artwork']?.front_default ?? null,
  };
}

type SpeciesResponse = {
  evolution_chain: { url: string } | null;
};

type EvolutionChainResponse = {
  chain: ChainLink;
};

// Takes the species id (PokemonDetail.speciesId): forms such as 10080 share their species' chain.
export async function getEvolutionChain(speciesId: number): Promise<PokemonSummary[]> {
  const species = await apiGet<SpeciesResponse>(`/pokemon-species/${speciesId}`);
  if (!species.evolution_chain) {
    return [];
  }
  const chainId = getIdFromUrl(species.evolution_chain.url);
  const data = await apiGet<EvolutionChainResponse>(`/evolution-chain/${chainId}`);
  return flattenChain(data.chain);
}
