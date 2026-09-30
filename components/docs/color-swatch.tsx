'use client';

import { cn } from '@/lib/utils';
import { useCopy, useCopyFormat } from './copy';

// One swatch tile. Click copies the token in the format picked by <CopyFormatToggle />:
// `var(--teal-500)`, `bg-teal-500` or `#288a5b`.
export function ColorSwatch({
  token,
  utility,
  label,
  hex,
  dark,
  brand = false,
  className,
}: {
  token: string;
  /** Tailwind class for this color, e.g. `bg-teal-500`. */
  utility: string;
  label: string;
  hex: string;
  dark: boolean;
  brand?: boolean;
  className?: string;
}) {
  const format = useCopyFormat();
  const { copied, copy } = useCopy();
  const value = { css: `var(--${token})`, tailwind: utility, hex }[format];

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      title={`--${token} · ${utility} · ${hex}`}
      aria-label={`Copy ${value}`}
      style={{ background: `var(--${token})` }}
      className={cn(
        'relative flex h-14 w-full flex-col justify-between rounded-lg p-2 text-left transition-transform duration-150 hover:-translate-y-0.5',
        dark ? 'text-site-nav-fg' : 'border border-site-border text-site-fg',
        className,
      )}
    >
      <span className="text-ui-xs font-medium">{brand ? 'Brand' : ''}</span>
      <span className="text-ui-xs">{copied ? 'Copied' : label}</span>
    </button>
  );
}
