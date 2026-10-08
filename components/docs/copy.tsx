'use client';

import { useState, useSyncExternalStore } from 'react';
import { cn } from '@/lib/utils';

// What a swatch copies. Shared by every swatch on the page and remembered per browser.
export type CopyFormat = 'css' | 'tailwind' | 'hex';

const FORMATS: { value: CopyFormat; label: string; example: string }[] = [
  { value: 'css', label: 'CSS variable', example: 'var(--primary)' },
  { value: 'tailwind', label: 'Tailwind', example: 'bg-primary' },
  { value: 'hex', label: 'Hex', example: '#ba5236' },
];

const STORAGE_KEY = 'matrix-ds:copy-format';
const listeners = new Set<() => void>();
let format: CopyFormat = 'css';
let loaded = false;

function read(): CopyFormat {
  if (!loaded) {
    loaded = true;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (FORMATS.some((f) => f.value === saved)) format = saved as CopyFormat;
    } catch {
      // Storage can be blocked (private mode); fall back to CSS variables.
    }
  }
  return format;
}

function setFormat(next: CopyFormat) {
  format = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Not persisted, still applies for this visit.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useCopyFormat(): CopyFormat {
  return useSyncExternalStore(subscribe, read, () => 'css');
}

/** Copies text and briefly reports success. */
export function useCopy() {
  const [copied, setCopied] = useState(false);
  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      // Clipboard can be blocked (permissions, insecure context); the value is still visible.
      console.warn('Could not copy', error);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }
  return { copied, copy };
}

// Segmented control above the swatches: choose what a click copies.
export function CopyFormatToggle() {
  const current = useCopyFormat();
  return (
    <div className="not-prose mb-6 flex flex-wrap items-center gap-3">
      <span className="text-ui text-site-muted">Swatches copy as</span>
      <div role="radiogroup" aria-label="Swatches copy as" className="inline-flex rounded-lg bg-site-code p-0.5">
        {FORMATS.map(({ value, label, example }) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={current === value}
            title={example}
            onClick={() => setFormat(value)}
            className={cn(
              'rounded-md px-3 py-1 text-ui-xs transition-colors duration-120',
              current === value ? 'bg-site-bg text-site-fg shadow-xs' : 'text-site-muted hover:text-site-fg',
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// An inline code chip that copies itself on click. Used for token names and Tailwind classes in tables.
// Pass `label` to show short text while copying a longer value.
export function CopyCode({ value, label, className }: { value: string; label?: string; className?: string }) {
  const { copied, copy } = useCopy();
  return (
    <button
      type="button"
      onClick={() => copy(value)}
      aria-label={`Copy ${value}`}
      title={label ? value : 'Click to copy'}
      className={cn(
        'relative -mx-1 rounded-md px-1 font-mono text-ui text-site-fg transition-colors duration-120 hover:bg-site-active',
        className,
      )}
    >
      {label ?? value}
      {/* Floats above the chip so the table doesn't shift while it shows. */}
      <span
        aria-live="polite"
        className={cn(
          'pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-site-nav px-2 py-0.5 font-sans text-ui-xs text-site-nav-fg transition-opacity duration-120',
          copied ? 'opacity-100' : 'opacity-0',
        )}
      >
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
}
