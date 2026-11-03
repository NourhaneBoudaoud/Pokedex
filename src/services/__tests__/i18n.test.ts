import { en } from '@/constants/translations/en';
import { fr } from '@/constants/translations/fr';
import {
  getTranslations,
  resolveLanguage,
  translate,
  translateStat,
  translateType,
  type Translate,
} from '@/services/i18n';

const english: Translate = (key, params) => translate(en, key, params);
const french: Translate = (key, params) => translate(fr, key, params);

describe('resolveLanguage', () => {
  it('picks French for a French phone', () => {
    expect(resolveLanguage('fr')).toBe('fr');
  });

  it('falls back to English for any other language', () => {
    expect(resolveLanguage('en')).toBe('en');
    expect(resolveLanguage('nl')).toBe('en');
    expect(resolveLanguage('de')).toBe('en');
    expect(resolveLanguage(null)).toBe('en');
  });
});

describe('translate', () => {
  it('gives the text of the language', () => {
    expect(translate(getTranslations('fr'), 'common.retry')).toBe('Réessayer');
    expect(translate(getTranslations('en'), 'common.retry')).toBe('Retry');
  });

  it('falls back to English when a key is missing', () => {
    expect(translate({}, 'common.retry')).toBe('Retry');
    expect(translate({ 'common.back': 'Retour' }, 'favorites.title')).toBe('My favorites');
  });

  it('replaces the placeholders', () => {
    expect(translate(fr, 'pokemon.open', { name: 'Pikachu' })).toBe('Ouvrir Pikachu');
    expect(translate(en, 'compare.row', { label: 'HP', left: 35, right: 45 })).toBe('HP: 35 against 45');
  });

  it('leaves a placeholder without a value as it is', () => {
    expect(translate(en, 'pokemon.open')).toBe('Open {name}');
  });
});

describe('French translations', () => {
  it('has every English key', () => {
    expect(Object.keys(en).filter((key) => !(key in fr))).toEqual([]);
  });

  it('keeps every placeholder of the English text', () => {
    const placeholders = (text: string | undefined) => (text?.match(/\{\w+\}/g) ?? []).sort();
    const englishTexts = new Map(Object.entries(en));
    for (const [key, text] of Object.entries(fr)) {
      expect([key, placeholders(text)]).toEqual([key, placeholders(englishTexts.get(key))]);
    }
  });
});

describe('translateStat', () => {
  const names = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

  it('gives the six labels of the Stats tab', () => {
    expect(names.map((name) => translateStat(english, name))).toEqual([
      'HP',
      'Attack',
      'Defense',
      'Special Attack',
      'Special Defense',
      'Speed',
    ]);
    expect(names.map((name) => translateStat(french, name))).toEqual([
      'PV',
      'Attaque',
      'Défense',
      'Attaque Spé.',
      'Défense Spé.',
      'Vitesse',
    ]);
  });

  it('keeps the PokeAPI name of an unknown stat', () => {
    expect(translateStat(french, 'accuracy')).toBe('Accuracy');
  });
});

describe('translateType', () => {
  it('translates the type names', () => {
    expect(translateType(english, 'grass')).toBe('Grass');
    expect(translateType(french, 'grass')).toBe('Plante');
    expect(translateType(french, 'electric')).toBe('Électrik');
  });

  it('keeps the PokeAPI name of an unknown type', () => {
    expect(translateType(french, 'stellar')).toBe('Stellar');
  });
});
