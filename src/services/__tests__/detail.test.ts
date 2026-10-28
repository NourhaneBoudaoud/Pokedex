import { getEvolutionChain, getPokemon } from '@/services/pokemon-api';
import {
  flattenChain,
  formatHeight,
  formatLabel,
  formatStatName,
  formatWeight,
  statBarRatio,
  type ChainLink,
} from '@/services/pokemon';

const fetchMock = jest.spyOn(globalThis, 'fetch');

function respondWith(body: unknown) {
  fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(body)));
}

afterEach(() => {
  fetchMock.mockReset();
});

afterAll(() => {
  fetchMock.mockRestore();
});

function resource(name: string, path: string) {
  return { name, url: `https://pokeapi.co/api/v2/${path}/` };
}

function link(name: string, id: number, evolvesTo: ChainLink[] = []): ChainLink {
  return {
    species: { name, url: `https://pokeapi.co/api/v2/pokemon-species/${id}/` },
    evolves_to: evolvesTo,
  };
}

describe('flattenChain', () => {
  it('lists a straight chain in order', () => {
    const chain = link('bulbasaur', 1, [link('ivysaur', 2, [link('venusaur', 3)])]);

    expect(flattenChain(chain)).toEqual([
      { id: 1, name: 'bulbasaur' },
      { id: 2, name: 'ivysaur' },
      { id: 3, name: 'venusaur' },
    ]);
  });

  it('lists the branches of Eevee one after the other', () => {
    const chain = link('eevee', 133, [link('vaporeon', 134), link('jolteon', 135), link('flareon', 136)]);

    expect(flattenChain(chain)).toEqual([
      { id: 133, name: 'eevee' },
      { id: 134, name: 'vaporeon' },
      { id: 135, name: 'jolteon' },
      { id: 136, name: 'flareon' },
    ]);
  });

  it('gives a single Pokémon when it does not evolve', () => {
    expect(flattenChain(link('tauros', 128))).toEqual([{ id: 128, name: 'tauros' }]);
  });
});

describe('formatHeight', () => {
  it('converts decimetres to metres', () => {
    expect(formatHeight(7)).toBe('0.7 m');
    expect(formatHeight(20)).toBe('2.0 m');
  });
});

describe('formatWeight', () => {
  it('converts hectograms to kilograms', () => {
    expect(formatWeight(69)).toBe('6.9 kg');
    expect(formatWeight(1000)).toBe('100.0 kg');
  });
});

describe('formatStatName', () => {
  it('writes HP in capitals', () => {
    expect(formatStatName('hp')).toBe('HP');
  });

  it('gives the six labels of the Stats tab', () => {
    const names = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

    expect(names.map(formatStatName)).toEqual([
      'HP',
      'Attack',
      'Defense',
      'Special Attack',
      'Special Defense',
      'Speed',
    ]);
  });
});

describe('formatLabel', () => {
  it('turns an ability name into words', () => {
    expect(formatLabel('static')).toBe('Static');
    expect(formatLabel('lightning-rod')).toBe('Lightning Rod');
  });
});

describe('statBarRatio', () => {
  it('is the share of a full bar', () => {
    expect(statBarRatio(0)).toBe(0);
    expect(statBarRatio(75)).toBe(0.5);
    expect(statBarRatio(150)).toBe(1);
  });

  it('is capped at 1', () => {
    expect(statBarRatio(255)).toBe(1);
  });
});

describe('getPokemon', () => {
  const PIKACHU = {
    id: 25,
    name: 'pikachu',
    base_experience: 112,
    height: 4,
    weight: 60,
    species: resource('pikachu', 'pokemon-species/25'),
    types: [{ slot: 1, type: resource('electric', 'type/13') }],
    stats: [
      { base_stat: 35, stat: resource('hp', 'stat/1') },
      { base_stat: 55, stat: resource('attack', 'stat/2') },
    ],
    abilities: [
      { is_hidden: true, slot: 3, ability: resource('lightning-rod', 'ability/31') },
      { is_hidden: false, slot: 1, ability: resource('static', 'ability/9') },
    ],
    sprites: { other: { 'official-artwork': { front_default: 'https://example.com/25.png' } } },
  };

  it('maps the fields of the About and Stats tabs', async () => {
    respondWith(PIKACHU);

    const pokemon = await getPokemon(25);

    expect(fetchMock).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/25');
    expect(pokemon).toEqual({
      id: 25,
      name: 'pikachu',
      speciesId: 25,
      types: ['electric'],
      stats: [
        { name: 'hp', value: 35 },
        { name: 'attack', value: 55 },
      ],
      heightDm: 4,
      weightHg: 60,
      baseExperience: 112,
      abilities: ['static', 'lightning-rod'],
      artworkUrl: 'https://example.com/25.png',
    });
  });

  it('gives no artwork when PokeAPI has none', async () => {
    respondWith({ ...PIKACHU, sprites: {} });

    const pokemon = await getPokemon(25);

    expect(pokemon.artworkUrl).toBeNull();
  });
});

describe('getEvolutionChain', () => {
  it('reads the chain of the species', async () => {
    respondWith({ evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/10/' } });
    respondWith({ chain: link('pichu', 172, [link('pikachu', 25, [link('raichu', 26)])]) });

    const chain = await getEvolutionChain(25);

    expect(fetchMock).toHaveBeenNthCalledWith(1, 'https://pokeapi.co/api/v2/pokemon-species/25');
    expect(fetchMock).toHaveBeenNthCalledWith(2, 'https://pokeapi.co/api/v2/evolution-chain/10');
    expect(chain.map((pokemon) => pokemon.name)).toEqual(['pichu', 'pikachu', 'raichu']);
  });

  it('gives an empty chain when the species has none', async () => {
    respondWith({ evolution_chain: null });

    expect(await getEvolutionChain(10080)).toEqual([]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
