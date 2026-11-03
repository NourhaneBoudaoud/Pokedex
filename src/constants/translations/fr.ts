import type { Translations } from '@/constants/translations/en';

// French. Same keys as `en.ts`; a key left out shows the English text.
export const fr: Translations = {
  // Shared
  'common.back': 'Retour',
  'common.cancel': 'Annuler',
  'common.retry': 'Réessayer',
  'common.loading': 'Chargement',
  'error.generic': 'Une erreur est survenue.',
  'offline.message': 'Vous êtes hors ligne, données enregistrées affichées',

  // Tabs
  'tabs.pokemon': 'Pokémon',
  'tabs.favorites': 'Favoris',

  // Home and search
  'home.title': 'Tous les Pokémon',
  'home.error': 'Impossible de charger les Pokémon.',
  'home.errorMore': 'Impossible d’en charger plus.',
  'search.placeholder': 'Rechercher un Pokémon..',
  'search.label': 'Rechercher un Pokémon',
  'search.hint': 'Ouvre l’écran de recherche',
  'search.start': 'Tapez un nom pour trouver un Pokémon',
  'search.noResults': 'Aucun Pokémon trouvé pour « {text} »',
  'search.error': 'Impossible de charger les noms des Pokémon.',

  // Favorites
  'favorites.title': 'Mes favoris',
  'favorites.error': 'Impossible de charger vos favoris.',
  'favorites.emptyTitle': 'Aucun favori pour l’instant',
  'favorites.emptyText': 'Touchez le cœur d’un Pokémon pour le garder ici.',
  'favorite.add': 'Ajouter {name} aux favoris',
  'favorite.remove': 'Retirer {name} des favoris',
  'favorite.thisPokemon': 'ce Pokémon',

  // Card, row and card menu
  'pokemon.open': 'Ouvrir {name}',
  'pokemon.pick': 'Choisir {name}',
  'pokemon.moreActions': 'Plus d’actions pour {name}',
  'menu.open': 'Ouvrir le Pokémon',
  'menu.addFavorite': 'Ajouter aux favoris',
  'menu.removeFavorite': 'Retirer des favoris',
  'menu.compare': 'Comparer',
  'menu.share': 'Partager',
  'menu.shareMessage': '{name} : {url}',

  // Detail
  'detail.header': '{name}, numéro {number}',
  'detail.artwork': 'Illustration de {name}',
  'detail.error': 'Impossible de charger ce Pokémon.',
  'detail.tab.about': 'À propos',
  'detail.tab.stats': 'Stats',
  'detail.tab.evolution': 'Évolution',
  'detail.tabPosition': '{tab}, onglet {index} sur {count}',
  'about.name': 'Nom',
  'about.id': 'ID',
  'about.base': 'Base',
  'about.baseValue': '{value} XP',
  'about.weight': 'Poids',
  'about.height': 'Taille',
  'about.types': 'Types',
  'about.abilities': 'Talents',
  'evolution.none': 'Ce Pokémon n’évolue pas.',
  'evolution.error': 'Impossible de charger les évolutions.',
  'type.label': 'Type : {name}',

  // Compare
  'compare.title': 'Comparer',
  'compare.pickTwo': 'Choisissez deux Pokémon à comparer',
  'compare.pickSecond': 'Choisissez un second Pokémon',
  'compare.error': 'Impossible de charger les stats.',
  'compare.total': 'Total',
  'compare.row': '{label} : {left} contre {right}',
  'compare.pickPicker': 'Tapez un nom pour choisir un Pokémon',
  'compare.slot.empty': 'Choisir un Pokémon',
  'compare.slot.notLoaded': 'Non chargé',
  'compare.slot.change': 'Changer',
  'compare.slot.changeName': 'Changer {name}',
  'compare.slot.pickFirst': 'Choisir le premier Pokémon',
  'compare.slot.pickSecond': 'Choisir le second Pokémon',
  'compare.slot.notLoadedFirst': 'Premier Pokémon non chargé. Le changer',
  'compare.slot.notLoadedSecond': 'Second Pokémon non chargé. Le changer',
  'compare.slot.loadingFirst': 'Chargement du premier Pokémon. Le changer',
  'compare.slot.loadingSecond': 'Chargement du second Pokémon. Le changer',

  // Stat names: the short forms of the French games.
  'stat.hp': 'PV',
  'stat.attack': 'Attaque',
  'stat.defense': 'Défense',
  'stat.special-attack': 'Attaque Spé.',
  'stat.special-defense': 'Défense Spé.',
  'stat.speed': 'Vitesse',

  // Type names: the names of the French games.
  'type.normal': 'Normal',
  'type.fighting': 'Combat',
  'type.flying': 'Vol',
  'type.poison': 'Poison',
  'type.ground': 'Sol',
  'type.rock': 'Roche',
  'type.bug': 'Insecte',
  'type.ghost': 'Spectre',
  'type.steel': 'Acier',
  'type.fire': 'Feu',
  'type.water': 'Eau',
  'type.grass': 'Plante',
  'type.electric': 'Électrik',
  'type.psychic': 'Psy',
  'type.ice': 'Glace',
  'type.dragon': 'Dragon',
  'type.dark': 'Ténèbres',
  'type.fairy': 'Fée',
};
