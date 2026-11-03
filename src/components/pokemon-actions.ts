import { ActionSheetIOS, Alert, Appearance, Platform, Share } from 'react-native';

import type { Translate } from '@/services/i18n';
import { formatName, getPokemonApiUrl, type PokemonSummary } from '@/services/pokemon';

type Handlers = {
  onOpen: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onCompare: () => void;
};

function sharePokemon(pokemon: PokemonSummary, t: Translate) {
  const name = formatName(pokemon.name);
  // A dismissed share sheet resolves normally; there is nothing to show if sharing fails.
  Share.share({ message: t('menu.shareMessage', { name, url: getPokemonApiUrl(pokemon.id) }) }).catch(() => undefined);
}

// The ⋮ menu of a card: the iOS action sheet from the design, an Alert with buttons on Android.
// Not a hook, so the caller passes `t` from `useTranslation()`.
export function showPokemonActions(
  pokemon: PokemonSummary,
  { onOpen, isFavorite, onToggleFavorite, onCompare }: Handlers,
  t: Translate,
) {
  const name = formatName(pokemon.name);
  const actions = [
    { label: t('menu.open'), run: onOpen },
    { label: t(isFavorite ? 'menu.removeFavorite' : 'menu.addFavorite'), run: onToggleFavorite },
    { label: t('menu.compare'), run: onCompare },
    { label: t('menu.share'), run: () => sharePokemon(pokemon, t) },
  ];

  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: name,
        // Same mode as the app (the Android Alert follows the system by itself).
        userInterfaceStyle: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
        options: [...actions.map((action) => action.label), t('common.cancel')],
        cancelButtonIndex: actions.length,
      },
      (index) => actions[index]?.run(),
    );
    return;
  }

  Alert.alert(name, undefined, [
    ...actions.map((action) => ({ text: action.label, onPress: action.run })),
    { text: t('common.cancel'), style: 'cancel' },
  ]);
}
