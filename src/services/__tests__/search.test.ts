import { filterPokemon } from '@/services/search';

const POKEMON = [
  { id: 172, name: 'pichu' },
  { id: 25, name: 'pikachu' },
  { id: 1, name: 'bulbasaur' },
  { id: 26, name: 'raichu' },
];

describe('filterPokemon', () => {
  it('matches the start of a name in any case', () => {
    expect(filterPokemon(POKEMON, 'PIKA')).toEqual([{ id: 25, name: 'pikachu' }]);
  });

  it('matches any part of a name', () => {
    expect(filterPokemon(POKEMON, 'chu').map((pokemon) => pokemon.name)).toEqual(['pikachu', 'raichu', 'pichu']);
  });

  it('returns the results in Pokédex order', () => {
    expect(filterPokemon(POKEMON, 'a').map((pokemon) => pokemon.id)).toEqual([1, 25, 26]);
  });

  it('ignores spaces around the text', () => {
    expect(filterPokemon(POKEMON, '  bulba ')).toEqual([{ id: 1, name: 'bulbasaur' }]);
  });

  it('gives no result for empty text', () => {
    expect(filterPokemon(POKEMON, '')).toEqual([]);
    expect(filterPokemon(POKEMON, '   ')).toEqual([]);
  });

  it('gives no result when nothing matches', () => {
    expect(filterPokemon(POKEMON, 'mew')).toEqual([]);
  });
});
