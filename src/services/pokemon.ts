import { API_BASE_URL } from '@/services/api-client';

export type PokemonSummary = {
  id: number;
  name: string;
};

const SPRITE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

// "https://pokeapi.co/api/v2/pokemon/25/" -> 25
export function getIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  if (!match) {
    throw new Error(`No id in ${url}`);
  }
  return Number(match[1]);
}

export function getSpriteUrl(id: number): string {
  return `${SPRITE_BASE_URL}/${id}.png`;
}

export function getPokemonApiUrl(id: number): string {
  return `${API_BASE_URL}/pokemon/${id}`;
}

// 1 -> "001", 25 -> "025", 10001 -> "10001"
export function formatNumber(id: number): string {
  return String(id).padStart(3, '0');
}

// "mr-mime" -> "Mr-mime"
export function formatName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export type PokemonStat = {
  name: string;
  value: number;
};

export type PokemonDetail = {
  id: number;
  name: string;
  speciesId: number;
  types: string[];
  stats: PokemonStat[];
  heightDm: number;
  weightHg: number;
  baseExperience: number | null;
  abilities: string[];
  artworkUrl: string | null;
};

// "special-attack" -> "Special Attack", "solar-power" -> "Solar Power"
export function formatLabel(name: string): string {
  return name
    .split('-')
    .map((word) => formatName(word))
    .join(' ');
}

// One decimal with the phone's separator (`useTranslation().decimalSeparator`): 6.9 -> "6,9" in French.
// No thousands separator: no Pokémon reaches 1000 kg or 1000 m.
function formatDecimal(value: number, decimalSeparator: string): string {
  return value.toFixed(1).replace('.', decimalSeparator);
}

// PokeAPI gives decimetres: 7 -> "0.7 m"
export function formatHeight(heightDm: number, decimalSeparator = '.'): string {
  return `${formatDecimal(heightDm / 10, decimalSeparator)} m`;
}

// PokeAPI gives hectograms: 69 -> "6.9 kg"
export function formatWeight(weightHg: number, decimalSeparator = '.'): string {
  return `${formatDecimal(weightHg / 10, decimalSeparator)} kg`;
}

// The design draws a full bar for about 150; a few stats go higher, so the bar is capped.
const STAT_BAR_MAX = 150;

export function statBarRatio(value: number): number {
  return Math.min(Math.max(value / STAT_BAR_MAX, 0), 1);
}

export type ChainLink = {
  species: { name: string; url: string };
  evolves_to: ChainLink[];
};

// Depth first: Bulbasaur, Ivysaur, Venusaur. Branches (Eevee) come one after the other.
export function flattenChain(link: ChainLink): PokemonSummary[] {
  return [
    { id: getIdFromUrl(link.species.url), name: link.species.name },
    ...link.evolves_to.flatMap(flattenChain),
  ];
}
