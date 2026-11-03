import { darkColors, lightColors, palettes } from '@/constants/theme';
import { contrastRatio } from '@/services/contrast';

// WCAG AA for normal text.
const MIN_TEXT_CONTRAST = 4.5;
const TEXT_TOKENS = ['text', 'textSecondary', 'textMuted', 'primary'] as const;
const BACKGROUNDS = ['background', 'surface', 'imageBackground'] as const;

describe('contrastRatio', () => {
  it('gives 21 for black on white and 1 for the same colour', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21);
    expect(contrastRatio('#5631E8', '#5631E8')).toBeCloseTo(1);
  });

  it('blends a translucent text colour onto the background', () => {
    // 50 % black on white is #808080.
    expect(contrastRatio('rgba(0, 0, 0, 0.5)', '#FFFFFF')).toBeCloseTo(contrastRatio('#808080', '#FFFFFF'), 1);
  });

  it('rejects a colour it cannot read', () => {
    expect(() => contrastRatio('red', '#FFFFFF')).toThrow('Unsupported colour');
  });
});

describe('palettes', () => {
  it('have the same tokens in light and dark', () => {
    expect(Object.keys(darkColors).sort()).toEqual(Object.keys(lightColors).sort());
  });

  describe.each(Object.entries(palettes))('%s', (_, colors) => {
    it.each(TEXT_TOKENS.flatMap((text) => BACKGROUNDS.map((background) => [text, background])))(
      '%s is readable on %s',
      (text, background) => {
        expect(contrastRatio(colors[text], colors[background])).toBeGreaterThanOrEqual(MIN_TEXT_CONTRAST);
      },
    );

    it('onPrimary is readable on primary', () => {
      expect(contrastRatio(colors.onPrimary, colors.primary)).toBeGreaterThanOrEqual(MIN_TEXT_CONTRAST);
    });
  });
});
