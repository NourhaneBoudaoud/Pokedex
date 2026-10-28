import { ActionSheetIOS, Alert, Platform, Share } from 'react-native';

import { formatName, getPokemonApiUrl, type PokemonSummary } from '@/services/pokemon';

type Handlers = {
  onOpen: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

function sharePokemon(pokemon: PokemonSummary) {
  const name = formatName(pokemon.name);
  // A dismissed share sheet resolves normally; there is nothing to show if sharing fails.
  Share.share({ message: `${name}: ${getPokemonApiUrl(pokemon.id)}` }).catch(() => undefined);
}

// The ⋮ menu of a card: the iOS action sheet from the design, an Alert with buttons on Android.
export function showPokemonActions(
  pokemon: PokemonSummary,
  { onOpen, isFavorite, onToggleFavorite }: Handlers,
) {
  const name = formatName(pokemon.name);
  const actions = [
    { label: 'Open Pokémon', run: onOpen },
    { label: isFavorite ? 'Remove from favorites' : 'Add to favorites', run: onToggleFavorite },
    { label: 'Share', run: () => sharePokemon(pokemon) },
  ];

  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: name,
        options: [...actions.map((action) => action.label), 'Cancel'],
        cancelButtonIndex: actions.length,
      },
      (index) => actions[index]?.run(),
    );
    return;
  }

  Alert.alert(name, undefined, [
    ...actions.map((action) => ({ text: action.label, onPress: action.run })),
    { text: 'Cancel', style: 'cancel' },
  ]);
}
