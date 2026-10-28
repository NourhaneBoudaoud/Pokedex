import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

import { colors, fontFamily, fontSize, iconSize } from '@/constants/theme';

function tabColor(focused: boolean) {
  return focused ? colors.primary : colors.text;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontFamily: fontFamily.regular,
          fontSize: fontSize.xs,
        },
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pokémons',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="catching-pokemon" size={iconSize.md} color={tabColor(focused)} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name={focused ? 'favorite' : 'favorite-border'}
              size={iconSize.md}
              color={tabColor(focused)}
            />
          ),
        }}
      />
    </Tabs>
  );
}
