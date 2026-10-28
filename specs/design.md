# Design reference

Taken from the course Figma file ([Pokémon Code Challenge](https://www.figma.com/design/dsgGXcu5WELIvRW90m5308/Pok%C3%A9mon-Code-Challenge?node-id=1-2)).
Screen exports are in [`docs/design/`](../docs/design/). Colours were sampled from those exports.
Every value below lives in `src/constants/theme.ts`; screens never hardcode a colour or a spacing.

## Colours

| Token | Hex | Used for |
|---|---|---|
| `background` | `#EDF6FF` | Screen background, detail header, bottom tab bar |
| `surface` | `#FFFFFF` | Card footer, search field, detail body |
| `imageBackground` | `#F6F6FF` | Behind the sprite on a card and on an evolution card |
| `primary` | `#5631E8` | Number badge, active tab, tab underline, stat bars |
| `onPrimary` | `#FFFFFF` | Text on `primary` |
| `text` | `#0E0940` | Titles, names, labels |
| `textSecondary` | `#625F83` | Values in About |
| `textMuted` | `#86849F` | Inactive detail tab |
| `tabInactive` | `#67688C` | Inactive bottom tab |
| `number` | `#AAAFC6` | Number in the detail header |
| `placeholder` | `#B3B3B3` | Search placeholder |
| `chip` | `#DBE3F0` | Type pill background |
| `divider` | `#DBDAE6` | Line under the detail tabs |
| `track` | `#F3F3F7` | Stat bar background |
| `favorite` | `#FF4F68` | Filled heart |

## Type colours

Shown as the dot in a type pill. The design shows four; the rest follow the same bright style.

| Type | Hex | | Type | Hex |
|---|---|---|---|---|
| grass | `#64BC55` (design) | | fire | `#FF4F68` (design) |
| poison | `#AB6AC8` (design) | | electric | `#FFCF00` (design) |
| normal | `#A8A77A` | | water | `#4D90D5` |
| ice | `#74CEC0` | | fighting | `#CE4069` |
| ground | `#D97746` | | flying | `#8FA8DD` |
| psychic | `#F97176` | | bug | `#90C12C` |
| rock | `#C7B78B` | | ghost | `#5269AC` |
| dragon | `#0A6DC4` | | dark | `#5A5366` |
| steel | `#5A8EA1` | | fairy | `#EC8FE6` |

## Font

Rubik, from the course [`fonts.zip`](https://github.com/Kevinvandenhoek/inholland-react-native-course/tree/main/exam/assets), loaded with Expo Font.

| Use | Weight | Size |
|---|---|---|
| Detail name | Bold | 30 |
| Screen title ("All Pokémon", "My favorites") | SemiBold | 22 |
| Card name, tab labels | Medium | 16 / 14 |
| About labels, stat names | Medium | 14 |
| Values | Regular | 14 |
| Number badge | Medium | 11 |

## Layout

The app is tested on an iPhone in Expo Go, so where the design has an iOS and an Android variant, follow the iOS one
(`Options-1.png` action sheet with a separate Cancel, `Detail-1.png` back chevron, safe area around the notch).
It must still work on Android.


- Side margin 24, gap between cards 16, card radius 8 with a soft shadow.
- List: two columns. Card = number badge top left ("001"), sprite on `imageBackground`, white footer with name and a ⋮ button.
- ⋮ opens an action sheet: Open Pokémon, Add to favorites, Share.
- Bottom tabs: Pokémons and Favorites. Active tab: icon in a `primary` pill.
- Search: the search icon becomes a back arrow, bottom tabs hidden, same cards.
- Detail: back + heart, name and number ("#001"), type pills, large official artwork overlapping the `background` header. Tabs About / Stats / Evolution, underlined.
  When scrolled, a compact header shows the name centred.
