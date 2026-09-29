import type { CSSProperties, ReactNode } from 'react';
import { contrast } from '@/lib/tokens';
import { cn } from '@/lib/utils';

// Side-by-side previews for open color decisions. Each option renders on the page and card
// surfaces with its measured contrast. Values come from tokens.css; nothing is hardcoded.

const SURFACES = [
  { token: 'background', label: 'Page' },
  { token: 'card', label: 'Card' },
];

function Verdict({ ratio, min }: { ratio: number; min: number }) {
  const pass = ratio >= min;
  const tint = pass ? 'success' : 'destructive';
  return (
    <span
      style={{
        background: `var(--tint-${tint}-fill)`,
        borderColor: `var(--tint-${tint}-border)`,
        color: `var(--tint-${tint}-text)`,
      }}
      className="inline-flex w-fit rounded-md border px-1.5 text-caption font-medium"
    >
      {ratio.toFixed(1)}:1 {pass ? 'pass' : 'fail'}
    </span>
  );
}

function OptionCard({
  title,
  detail,
  recommended,
  children,
}: {
  title: string;
  detail: string;
  recommended?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-xl border',
        recommended ? 'border-site-fg' : 'border-site-border',
      )}
    >
      <div className="flex items-baseline justify-between gap-2 px-4 pt-3">
        <p className="text-body-sm font-medium text-site-fg">{title}</p>
        {recommended && <span className="text-caption text-site-muted">Recommended</span>}
      </div>
      <p className="px-4 pb-3 font-mono text-caption text-site-subtle">{detail}</p>
      <div className="grid grid-cols-2 border-t border-site-border">{children}</div>
    </div>
  );
}

function Surface({ token, label, children }: { token: string; label: string; children: ReactNode }) {
  return (
    <div style={{ background: `var(--${token})` }} className="flex flex-col gap-3 p-4">
      <span style={{ color: 'var(--muted-foreground)' }} className="text-caption">
        {label}
      </span>
      {children}
    </div>
  );
}

// Mock controls styled with Matrix semantic tokens, shown in their focused state.
const inputStyle: CSSProperties = {
  background: 'var(--background)',
  color: 'var(--muted-foreground)',
};

function MockInput({ border, ring }: { border: string; ring?: CSSProperties['boxShadow'] }) {
  return (
    <div
      style={{ ...inputStyle, borderColor: `var(--${border})`, boxShadow: ring }}
      className="flex h-9 items-center rounded-md border px-3 text-body-sm"
    >
      Email
    </div>
  );
}

function MockButton({ ring }: { ring: CSSProperties['boxShadow'] }) {
  return (
    <div
      style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', boxShadow: ring }}
      className="flex h-9 w-fit items-center rounded-md px-4 text-body-sm font-medium"
    >
      Continue
    </div>
  );
}

type RingOption = {
  title: string;
  detail: string;
  /** The ring color whose contrast against the surface decides pass/fail. */
  measured: string;
  ring: (surface: string) => string;
  recommended?: boolean;
};

const RING_OPTIONS: RingOption[] = [
  {
    title: 'Gold (current)',
    detail: '2px --gold-400, 2px gap',
    measured: 'gold-400',
    ring: (s) => `0 0 0 2px var(--${s}), 0 0 0 4px var(--gold-400)`,
  },
  {
    title: 'Two-tone',
    detail: '2px --neutral-800 + 2px --gold-400',
    measured: 'neutral-800',
    ring: () => '0 0 0 2px var(--neutral-800), 0 0 0 4px var(--gold-400)',
    recommended: true,
  },
  {
    title: 'Darker gold',
    detail: '2px --gold-600, 2px gap',
    measured: 'gold-600',
    ring: (s) => `0 0 0 2px var(--${s}), 0 0 0 4px var(--gold-600)`,
  },
  {
    title: 'Coral',
    detail: '2px --coral-500, 2px gap',
    measured: 'coral-500',
    ring: (s) => `0 0 0 2px var(--${s}), 0 0 0 4px var(--coral-500)`,
  },
];

export function FocusRingOptions() {
  return (
    <div className="not-prose mb-6 grid gap-4 sm:grid-cols-2">
      {RING_OPTIONS.map((option) => (
        <OptionCard key={option.title} {...option}>
          {SURFACES.map((surface) => (
            <Surface key={surface.token} {...surface}>
              <MockButton ring={option.ring(surface.token)} />
              <MockInput border="border" ring={option.ring(surface.token)} />
              <Verdict ratio={contrast(option.measured, surface.token)} min={3} />
            </Surface>
          ))}
        </OptionCard>
      ))}
    </div>
  );
}

const BORDER_OPTIONS = [
  { step: 'neutral-300', title: 'Neutral 300 (current)', detail: 'Style library border-subtle' },
  { step: 'neutral-400', title: 'Neutral 400', detail: 'One step darker' },
  { step: 'neutral-500', title: 'Neutral 500', detail: 'Inputs only; dividers stay 300', recommended: true },
];

export function InputBorderOptions() {
  return (
    <div className="not-prose mb-6 grid gap-4 sm:grid-cols-3">
      {BORDER_OPTIONS.map(({ step, title, detail, recommended }) => (
        <OptionCard key={step} title={title} detail={`--${step} · ${detail}`} recommended={recommended}>
          {SURFACES.map((surface) => (
            <Surface key={surface.token} {...surface}>
              <MockInput border={step} />
              <Verdict ratio={contrast(step, surface.token)} min={3} />
            </Surface>
          ))}
        </OptionCard>
      ))}
    </div>
  );
}
