import 'server-only';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Reads styles/tokens.css at build time so documentation pages show real token values
// instead of retyped hex codes.

const HEX = /^#[0-9a-f]{6}$/i;
const VAR = /^var\(--([a-z0-9-]+)\)$/i;

const TOKENS_FILE = join(process.cwd(), 'styles/tokens.css');

// Cached per file version: the dev server doesn't reload this module when tokens.css
// changes (it isn't an import), so re-read whenever the file's modified time moves.
let cache: { mtimeMs: number; values: Map<string, string> } | undefined;

function declarations(): Map<string, string> {
  const { mtimeMs } = statSync(TOKENS_FILE);
  if (cache?.mtimeMs === mtimeMs) return cache.values;
  const css = readFileSync(TOKENS_FILE, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const values = new Map<string, string>();
  for (const match of css.matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    values.set(match[1], match[2].trim());
  }
  cache = { mtimeMs, values };
  return values;
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

// Tailwind exposes a color token as a utility only when a @theme block maps it
// (`--color-primary: var(--primary)` → `bg-primary`). Matrix colors are mapped in styles/theme.css,
// site chrome in app/global.css; read both so the docs never show a class that doesn't exist.
const THEME_FILES = [join(process.cwd(), 'styles/theme.css'), join(process.cwd(), 'app/global.css')];
let themeCache: { key: string; colors: Set<string> } | undefined;

function themeColors(): Set<string> {
  const key = THEME_FILES.map((f) => statSync(f).mtimeMs).join(':');
  if (themeCache?.key === key) return themeCache.colors;
  const css = THEME_FILES.map((f) => readFileSync(f, 'utf8')).join('\n');
  const colors = new Set([...css.matchAll(/--color-([a-z0-9-]+)\s*:/gi)].map((m) => m[1]));
  themeCache = { key, colors };
  return colors;
}

export type UtilityPrefix = 'bg' | 'text' | 'border' | 'outline';

/** The prefix a role is normally used with: text roles → `text-`, edges → `border-`, the ring → `outline-`. */
export function defaultPrefix(name: string): UtilityPrefix {
  if (name === 'foreground' || name === 'link' || name.endsWith('-foreground') || name.endsWith('-text')) return 'text';
  if (name === 'border' || name === 'input' || name.endsWith('-border')) return 'border';
  if (name === 'ring') return 'outline';
  return 'bg';
}

/** The Tailwind class for a color token, e.g. `muted-foreground` → `text-muted-foreground`. */
export function tailwindUtility(name: string, prefix: UtilityPrefix = defaultPrefix(name)): string {
  if (!themeColors().has(name)) {
    throw new Error(`--${name} has no Tailwind utility: add --color-${name} to @theme in styles/theme.css`);
  }
  return `${prefix}-${name}`;
}
