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
