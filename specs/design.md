# Design reference

Taken from the course Figma file ([Pokémon Code Challenge](https://www.figma.com/design/dsgGXcu5WELIvRW90m5308/Pok%C3%A9mon-Code-Challenge?node-id=1-2)).
Exports in [`docs/design/`](../docs/design/): PNG to look at, SVG for exact values. Colours, sizes, radii and
shadows below are read from the SVG exports; font sizes and weights were fitted against the outlined text
(width and height within 2 %). Frame: 390 × 844.

Every value below lives in `src/constants/theme.ts`; screens never hardcode a colour or a spacing.

The app is tested on an iPhone in Expo Go, so where the design has an iOS and an Android variant, follow the iOS one
(`Options-1.png` action sheet with a separate Cancel, `Detail-1.png` back chevron, safe area around the notch).
It must still work on Android.

## Colours

The design has one text colour, `#0E0940`, used at different opacities.

| Token | Value | Used for |
|---|---|---|
| `background` | `#EDF6FF` | Screen background, detail header |
| `surface` | `#FFFFFF` | Cards, search field, detail body |
| `imageBackground` | `#F7F7FF` | Behind the sprite on a card and on an evolution card |
| `primary` | `#5631E8` | Number badge, active tab and its underline, stat bars, active bottom tab |
| `onPrimary` | `#FFFFFF` | Text on `primary` |
| `text` | `#0E0940` | Titles, names, labels |
| `textSecondary` | `#0E0940` at 65 % | Values in About and Stats |
| `textMuted` | `#0E0940` at 50 % | Inactive detail tab |
| `textFaint` | `#0E0940` at 30 % | Number in the detail header, search placeholder |
| `chip` | `#0E0940` at 8 % | Type pill background |
| `divider` | `#DBDAE6` | Line under the detail tabs |
| `track` | `#F3F3F7` | Stat bar background |
| `favorite` | `#FF4F68` | Filled heart |
| `tabBar` | `#EDF6FF` at 50 % | Bottom tab bar (over the list) |
| `shadow` | `#303773` at 15 %, offset y 2, blur 15 | Cards and search field |

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

## Fonts

Two families:

- **Cabinet Grotesk** (free, [Fontshare](https://www.fontshare.com/fonts/cabinet-grotesk), ITF Free Font License: embedding in an app is allowed) for the big titles.
- **Rubik**, from the course [`fonts.zip`](https://github.com/Kevinvandenhoek/inholland-react-native-course/tree/main/exam/assets), for everything else.

Both loaded with Expo Font.

| Use | Font | Size |
|---|---|---|
| Screen title ("All Pokémon", "My favorites") | Cabinet Grotesk ExtraBold | 24 |
| Detail name ("Bulbasaur") | Cabinet Grotesk ExtraBold | 32 |
| Detail number ("#001"), `textFaint` | Cabinet Grotesk Regular | 24 |
| Card name, evolution name, type pill | Rubik Medium | 16 |
| Detail tabs, About labels, stat names | Rubik Medium | 14 |
| About values, stat values | Rubik Regular | 14 |
| Number badge ("001") | Rubik Regular | 10 |
| Bottom tab label | Rubik Regular | 10 |

## Layout

Spacing scale: 4, 8, 16, 24. Side margin 24.

- **Search field**: x 16, y 60, 358 × 48, radius 8, white, shadow. Icon at 24 from the left, text at 52.
- **Title** "All Pokémon": baseline about 36 below the search field, left 24.
- **Card**: 163 × 211, radius 8, white, shadow. Image area 163 × 163 on `imageBackground`. Two columns at x 24 and 203
  (gap 16), rows 227 apart (gap 16). Badge at 8, 8: height 18, radius 4, padding 4 horizontal. Name at 12 from the left,
  ⋮ at 12 from the right, both centred in the 48 high footer.
- **Bottom tabs**: 84 high including the home indicator, Pokémons and Favorites, icon 20 above a 10 label.
  Active: `primary` icon and label.
- **Action sheet** (⋮): iOS `ActionSheetIOS` with Open Pokémon, Add to favorites, Share, and Cancel.
- **Search screen**: the search icon becomes a back arrow, bottom tabs hidden, same cards starting at y 140.
- **Detail header** (`background`, down to y 372): back and heart at y 62, name at 24 left (top ~122), number right-aligned
  at 24 from the right, type pills at y 166 (height 32, radius 16, dot 8 then label), artwork 200 × 200 centred at y 222,
  overlapping the white body that starts at y 372.
- **Detail tabs**: three equal tabs of 114 across 342, labels at y ~454, underline at y 476: 2 high, `primary` under the
  active tab, `divider` under the others.
- **About**: rows 34 apart from y ~506, label at x 24, value at x 140.
- **Stats**: rows 53 apart from y ~506, name left, value right, bar below: 342 × 4, radius 2, `track` with a `primary` fill.
  The design's bar lengths are drawn by eye (no fixed scale); use value / 150, capped at 100 %.
- **Evolution**: cards 342 × 80, radius 8, white, shadow, 38 apart (dotted line between). Sprite area 80 × 80 on
  `imageBackground`, badge and name at x 116.
- **Detail scrolled**: compact header 100 high, `background` at 50 %, name centred; the tabs stick under it.
- **Splash**: Pokémon logo, 216 × 79, centred, on `background`. Source: embedded image in `docs/design/Splashscreen.svg`.

## Loading placeholders

While something loads, the screen shows grey blocks (`colors.skeleton`, `#0E0940` at 6 %) in the shape and size of
what is coming, pulsing between 40 % and 100 % opacity (800 ms each way). Nothing jumps when the content arrives.

- Lists: placeholder cards in the same grid (badge, name line); one row of two at the end of a list while the next page loads.
- Images: a rounded block inset by 20 % inside the image area until the image has loaded, then a 200 ms fade-in.
- Detail: name, number, two pills, a round artwork, the tabs and the About rows.
- Evolution tab: three placeholder evolution cards joined by the dotted line.
