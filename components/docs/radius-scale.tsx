import { rawToken } from '@/lib/tokens';
import { CopyCode } from './copy';

export type RadiusStep = { step: string; use: string; provisional?: boolean };

// Radius steps as a table: token + Tailwind class, a live corner, the value read from tokens.css, and its use.
export function RadiusScale({ steps }: { steps: RadiusStep[] }) {
  return (
    <div className="not-prose mb-4 overflow-x-auto rounded-xl border border-site-border">
      <table className="w-full text-left text-body-sm">
        <thead>
          <tr className="border-b border-site-border">
            {['Token', 'Example', 'Value', 'Use'].map((h) => (
              <th key={h} className="px-4 py-3 text-caption font-normal text-site-subtle">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-site-border">
          {steps.map(({ step, use, provisional }) => (
            <tr key={step}>
              <td className="px-4 py-3 whitespace-nowrap">
                <CopyCode value={`--rounded-${step}`} />
                <CopyCode value={`rounded-${step}`} className="mt-1 block text-caption text-site-muted" />
              </td>
              <td className="px-4 py-3">
                <div
                  style={{ borderRadius: `var(--rounded-${step})` }}
                  className="h-12 w-20 border border-site-border bg-site-code"
                />
              </td>
              <td className="px-4 py-3 font-mono whitespace-nowrap text-site-muted">{rawToken(`rounded-${step}`)}</td>
              <td className="px-4 py-3 text-site-muted">
                {use}
                {provisional && (
                  <span className="ml-2 rounded-md bg-site-hover px-1.5 py-0.5 text-caption text-site-fg">
                    Provisional
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Do / don't: a 16px card with 8px padding. Inner items at 8px (16 − 8) vs. the same 16px.
export function NestedRadius() {
  const examples = [
    { label: 'Inner 8px: outer 16px − 8px padding', inner: 'rounded-md', ok: true },
    { label: 'Inner 16px: same as the outer corner', inner: 'rounded-xl', ok: false },
  ];
  return (
    <div className="not-prose mb-4 grid gap-4 sm:grid-cols-2">
      {examples.map(({ label, inner, ok }) => (
        <figure key={inner} className="rounded-xl border border-site-border p-6">
          <div className="space-y-2 rounded-xl border border-border bg-card p-2">
            {['Inbox', 'Agents', 'Settings'].map((item, i) => (
              <div
                key={item}
                className={`${inner} px-3 py-2 text-body-sm text-foreground ${i === 0 ? 'bg-background shadow-xs' : ''}`}
              >
                {item}
              </div>
            ))}
          </div>
          <figcaption className="mt-3 flex gap-2 text-caption text-site-muted">
            <span aria-hidden="true">{ok ? '✓' : '✕'}</span>
            {label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

// Radius picked by element height: the same shape family, scaled. Heights and radii are the documented pairs.
const BY_SIZE = [
  { height: 'h-3 w-3', px: 12, step: '2xs', what: 'Status dot, mini swatch' },
  { height: 'h-5 w-10', px: 20, step: 'xs', what: 'Checkbox, counter, tag' },
  { height: 'h-8 w-20', px: 32, step: 'md', what: 'Compact button, menu item' },
  { height: 'h-10 w-24', px: 40, step: 'lg', what: 'Button, input' },
  { height: 'h-24 w-32', px: 96, step: 'xl', what: 'Card, panel' },
];

export function RadiusBySize() {
  return (
    <div className="not-prose mb-4 overflow-x-auto rounded-xl border border-site-border">
      <table className="w-full text-left text-body-sm">
        <thead>
          <tr className="border-b border-site-border">
            {['Element height', 'Example', 'Radius', 'For'].map((h) => (
              <th key={h} className="px-4 py-3 text-caption font-normal text-site-subtle">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-site-border">
          {BY_SIZE.map(({ height, px, step, what }) => (
            <tr key={step}>
              <td className="px-4 py-3 whitespace-nowrap text-site-muted">
                {px < 16 ? 'Under 16px' : `~${px}px`}
              </td>
              <td className="px-4 py-3">
                <div
                  style={{ borderRadius: `var(--rounded-${step})` }}
                  className={`${height} border border-site-border bg-site-code`}
                />
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <CopyCode value={`rounded-${step}`} />
              </td>
              <td className="px-4 py-3 text-site-muted">{what}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
