// The one PokeAPI client. Every request to the API goes through apiGet.

export const API_BASE_URL = 'https://pokeapi.co/api/v2';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new ApiError(`PokeAPI returned ${response.status} for ${path}`, response.status);
  }
  return response.json();
}
