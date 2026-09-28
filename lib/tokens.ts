import 'server-only';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Reads styles/tokens.css at build time so documentation pages show real token values
// instead of retyped hex codes.

const HEX = /^#[0-9a-f]{6}$/i;
const VAR = /^var\(--([a-z0-9-]+)\)$/i;

let cache: Map<string, string> | undefined;

function declarations(): Map<string, string> {
  if (cache) return cache;
  const css = readFileSync(join(process.cwd(), 'styles/tokens.css'), 'utf8').replace(
    /\/\*[\s\S]*?\*\//g,
    '',
  );
  cache = new Map();
  for (const match of css.matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    cache.set(match[1], match[2].trim());
  }
  return cache;
}

/** The raw declared value, e.g. `var(--teal-800)` or `#0e3422`. */
export function rawToken(name: string): string {
  const value = declarations().get(name);
  if (value === undefined) throw new Error(`Unknown token --${name} in styles/tokens.css`);
  return value;
}

/** The token that `name` points to, e.g. `primary` → `teal-800`. Undefined for literal values. */
export function tokenTarget(name: string): string | undefined {
  return VAR.exec(rawToken(name))?.[1];
}

/** Resolves a color token through var() chains to its hex value. */
export function resolveColor(name: string): string {
  const seen = new Set<string>();
  let current = name;
  for (;;) {
    if (seen.has(current)) throw new Error(`Circular token reference at --${current}`);
    seen.add(current);
    const value = rawToken(current);
    if (HEX.test(value)) return value.toLowerCase();
    const next = VAR.exec(value)?.[1];
    if (!next) throw new Error(`--${name} does not resolve to a hex color (got "${value}")`);
    current = next;
  }
}

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two color tokens. */
export function contrast(a: string, b: string): number {
  const [la, lb] = [luminance(resolveColor(a)), luminance(resolveColor(b))];
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** True when white text has more contrast than near-black text on this color (luminance below ~0.18). */
export function isDark(name: string): boolean {
  return luminance(resolveColor(name)) < 0.18;
}
