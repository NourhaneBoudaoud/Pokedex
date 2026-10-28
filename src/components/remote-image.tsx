import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Skeleton } from '@/components/skeleton';
import { radius } from '@/constants/theme';

type Props = {
  uri: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

const FADE_MS = 200;

// Every Pokémon image: a placeholder until the image has loaded, then a short fade-in.
export function RemoteImage({ uri, style, accessibilityLabel }: Props) {
  // The URI that finished loading, so a new URI shows the placeholder again.
  const [loadedUri, setLoadedUri] = useState<string | null>(null);
  const loaded = loadedUri === uri;

  return (
    <View style={style}>
      {!loaded && <Skeleton style={styles.placeholder} radius={radius.md} />}
      <Image
        source={uri}
        style={StyleSheet.absoluteFill}
        contentFit="contain"
        transition={FADE_MS}
        recyclingKey={uri}
        onLoad={() => setLoadedUri(uri)}
        accessibilityLabel={accessibilityLabel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Inset so the placeholder reads as "an image is coming", not as a second background.
  placeholder: {
    ...StyleSheet.absoluteFill,
    margin: '20%',
  },
});
