// Every text the app writes, in English (the default language and the fallback). `{name}` is replaced by
// `translate`. Pokémon names and abilities come from PokeAPI and are not here.
export const en = {
  // Shared
  'common.back': 'Back',
  'common.cancel': 'Cancel',
  'common.retry': 'Retry',
  'common.loading': 'Loading',
  'error.generic': 'Something went wrong.',
  'offline.message': 'You are offline, showing saved data',

  // Tabs
  'tabs.pokemon': 'Pokémons',
  'tabs.favorites': 'Favorites',

  // Home and search
  'home.title': 'All Pokémon',
  'home.error': 'Could not load the Pokémon.',
  'home.errorMore': 'Could not load more.',
  'search.placeholder': 'Search for Pokémon..',
  'search.label': 'Search for Pokémon',
  'search.hint': 'Opens the search screen',
  'search.start': 'Start typing to find a Pokémon',
  'search.noResults': 'No Pokémon found for "{text}"',
  'search.error': 'Could not load the Pokémon names.',

  // Favorites
  'favorites.title': 'My favorites',
  'favorites.error': 'Could not load your favorites.',
  'favorites.emptyTitle': 'No favorites yet',
  'favorites.emptyText': 'Tap the heart on a Pokémon to keep it here.',
  'favorite.add': 'Add {name} to favorites',
  'favorite.remove': 'Remove {name} from favorites',
  'favorite.thisPokemon': 'this Pokémon',

  // Card, row and card menu
  'pokemon.open': 'Open {name}',
  'pokemon.pick': 'Pick {name}',
  'pokemon.moreActions': 'More actions for {name}',
  'menu.open': 'Open Pokémon',
  'menu.addFavorite': 'Add to favorites',
  'menu.removeFavorite': 'Remove from favorites',
  'menu.compare': 'Compare',
  'menu.share': 'Share',
  'menu.shareMessage': '{name}: {url}',

  // Detail
  'detail.header': '{name}, number {number}',
  'detail.artwork': '{name} artwork',
  'detail.error': 'Could not load this Pokémon.',
  'detail.tab.about': 'About',
  'detail.tab.stats': 'Stats',
  'detail.tab.evolution': 'Evolution',
  'detail.tabPosition': '{tab}, tab {index} of {count}',
  'about.name': 'Name',
  'about.id': 'ID',
  'about.base': 'Base',
  'about.baseValue': '{value} XP',
  'about.weight': 'Weight',
  'about.height': 'Height',
  'about.types': 'Types',
  'about.abilities': 'Abilities',
  'evolution.none': 'This Pokémon does not evolve.',
  'evolution.error': 'Could not load the evolution chain.',
  'type.label': 'Type: {name}',

  // Compare
  'compare.title': 'Compare',
  'compare.pickTwo': 'Pick two Pokémon to compare',
  'compare.pickSecond': 'Pick a second Pokémon',
  'compare.error': 'Could not load the stats.',
  'compare.total': 'Total',
  'compare.row': '{label}: {left} against {right}',
  'compare.pickPicker': 'Type a name to pick a Pokémon',
  'compare.slot.empty': 'Pick a Pokémon',
  'compare.slot.notLoaded': 'Not loaded',
  'compare.slot.change': 'Change',
  'compare.slot.changeName': 'Change {name}',
  'compare.slot.pickFirst': 'Pick the first Pokémon',
  'compare.slot.pickSecond': 'Pick the second Pokémon',
  'compare.slot.notLoadedFirst': 'First Pokémon not loaded. Change it',
  'compare.slot.notLoadedSecond': 'Second Pokémon not loaded. Change it',
  'compare.slot.loadingFirst': 'Loading the first Pokémon. Change it',
  'compare.slot.loadingSecond': 'Loading the second Pokémon. Change it',

  // Stat names (PokeAPI stat name after "stat.")
  'stat.hp': 'HP',
  'stat.attack': 'Attack',
  'stat.defense': 'Defense',
  'stat.special-attack': 'Special Attack',
  'stat.special-defense': 'Special Defense',
  'stat.speed': 'Speed',

  // Type names (PokeAPI type name after "type.")
  'type.normal': 'Normal',
  'type.fighting': 'Fighting',
  'type.flying': 'Flying',
  'type.poison': 'Poison',
  'type.ground': 'Ground',
  'type.rock': 'Rock',
  'type.bug': 'Bug',
  'type.ghost': 'Ghost',
  'type.steel': 'Steel',
  'type.fire': 'Fire',
  'type.water': 'Water',
  'type.grass': 'Grass',
  'type.electric': 'Electric',
  'type.psychic': 'Psychic',
  'type.ice': 'Ice',
  'type.dragon': 'Dragon',
  'type.dark': 'Dark',
  'type.fairy': 'Fairy',
};

export type TranslationKey = keyof typeof en;

// A language file: a missing key falls back to English.
export type Translations = Partial<Record<TranslationKey, string>>;
