import { getPokemonPage, PAGE_SIZE } from '@/services/pokemon-api';
import { formatName, formatNumber, getIdFromUrl, getPokemonApiUrl, getSpriteUrl } from '@/services/pokemon';

describe('getIdFromUrl', () => {
  it('reads the id at the end of a PokeAPI url', () => {
    expect(getIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25);
    expect(getIdFromUrl('https://pokeapi.co/api/v2/pokemon/10080')).toBe(10080);
  });

  it('throws when the url has no id', () => {
    expect(() => getIdFromUrl('https://pokeapi.co/api/v2/pokemon/')).toThrow();
  });
});

describe('formatNumber', () => {
  it('pads to three digits', () => {
    expect(formatNumber(1)).toBe('001');
    expect(formatNumber(25)).toBe('025');
    expect(formatNumber(151)).toBe('151');
  });

  it('keeps longer numbers as they are', () => {
    expect(formatNumber(10001)).toBe('10001');
  });
});

describe('formatName', () => {
  it('capitalises the first letter only', () => {
    expect(formatName('pikachu')).toBe('Pikachu');
    expect(formatName('mr-mime')).toBe('Mr-mime');
  });
});

describe('getPokemonApiUrl', () => {
  it('gives the PokeAPI link that Share sends', () => {
    expect(getPokemonApiUrl(25)).toBe('https://pokeapi.co/api/v2/pokemon/25');
  });
});

describe('getSpriteUrl', () => {
  it('gives the sprite of the card', () => {
    expect(getSpriteUrl(25)).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png');
  });
});

describe('getPokemonPage', () => {
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

  it('maps the results and gives the next offset', async () => {
    respondWith({
      count: 1350,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=40&limit=20',
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    });

    const page = await getPokemonPage(20);

    expect(fetchMock).toHaveBeenCalledWith(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=20`);
    expect(page).toEqual({
      items: [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'ivysaur' },
      ],
      nextOffset: 20 + PAGE_SIZE,
    });
  });

  it('gives no next offset on the last page', async () => {
    respondWith({
      count: 1350,
      next: null,
      results: [{ name: 'pecharunt', url: 'https://pokeapi.co/api/v2/pokemon/1025/' }],
    });

    const page = await getPokemonPage(1340);

    expect(page.nextOffset).toBeNull();
  });

  it('throws when the API fails', async () => {
    fetchMock.mockResolvedValueOnce(new Response('', { status: 500 }));

    await expect(getPokemonPage(0)).rejects.toThrow('PokeAPI returned 500');
  });
});
