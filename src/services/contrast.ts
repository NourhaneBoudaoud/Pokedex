// WCAG 2 contrast ratio between a text colour and the colour behind it. Accepts #RRGGBB and rgba(r, g, b, a):
// a translucent text colour is first blended onto the background, as the screen draws it.

type Rgb = [number, number, number];
type Rgba = [number, number, number, number];

function parseColor(color: string): Rgba {
  const hex = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(color);
  if (hex) {
    return [parseInt(hex[1], 16), parseInt(hex[2], 16), parseInt(hex[3], 16), 1];
  }
  const rgba = /^rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\s*\)$/.exec(color);
  if (rgba) {
    return [Number(rgba[1]), Number(rgba[2]), Number(rgba[3]), rgba[4] === undefined ? 1 : Number(rgba[4])];
  }
  throw new Error(`Unsupported colour: ${color}`);
}

function blend([r, g, b, alpha]: Rgba, [br, bg, bb]: Rgb): Rgb {
  return [r * alpha + br * (1 - alpha), g * alpha + bg * (1 - alpha), b * alpha + bb * (1 - alpha)];
}

function luminance(rgb: Rgb): number {
  const [r, g, b] = rgb.map((channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// The background must be opaque.
export function contrastRatio(foreground: string, background: string): number {
  const [br, bg, bb] = parseColor(background);
  const back: Rgb = [br, bg, bb];
  const front = luminance(blend(parseColor(foreground), back));
  const behind = luminance(back);
  return (Math.max(front, behind) + 0.05) / (Math.min(front, behind) + 0.05);
}
