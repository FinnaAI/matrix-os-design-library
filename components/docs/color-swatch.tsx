'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

// One swatch tile. Click copies its CSS token, e.g. `var(--teal-800)`.
export function ColorSwatch({
  token,
  label,
  hex,
  dark,
  brand = false,
  className,
}: {
  token: string;
  label: string;
  hex: string;
  dark: boolean;
  brand?: boolean;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(`var(--${token})`);
    } catch (error) {
      // Clipboard can be blocked (permissions, insecure context); the token is still in the tooltip.
      console.warn('Could not copy token', error);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={`--${token} · ${hex}`}
      aria-label={`Copy --${token} (${hex})`}
      style={{ background: `var(--${token})` }}
      className={cn(
        'relative flex h-14 w-full flex-col justify-between rounded-lg p-2 text-left transition-transform duration-150 hover:-translate-y-0.5',
        dark ? 'text-site-nav-fg' : 'border border-site-border text-site-fg',
        className,
      )}
    >
      <span className="text-caption font-medium">{brand ? 'Brand' : ''}</span>
      <span className="text-caption">{copied ? 'Copied' : label}</span>
    </button>
  );
}
