import { rawToken } from '@/lib/tokens';
import { CopyCode } from './copy';

const SPACE_STEPS = ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];

function px(value: string): number {
  return value === '0' ? 0 : Number.parseFloat(value);
}

// Tailwind's spacing unit is 4px, so a token's class number is its pixels ÷ 4 (8px → 2, 6px → 1.5).
function tailwindStep(value: string): string {
  return String(px(value) / 4);
}

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="not-prose mb-4 overflow-x-auto rounded-xl border border-site-border">
      <table className="w-full text-left text-ui">
        <thead>
          <tr className="border-b border-site-border">
            {head.map((h) => (
              <th key={h} className="px-4 py-3 text-ui-xs font-normal text-site-subtle">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-site-border">{children}</tbody>
      </table>
    </div>
  );
}

// The spacing scale, read from tokens.css: token, the matching Tailwind classes, a bar at true size, the value.
export function SpaceScale() {
  return (
    <Table head={['Token', 'Tailwind', 'Example', 'Value']}>
      {SPACE_STEPS.map((step) => {
        const value = rawToken(`space-${step}`);
        const n = tailwindStep(value);
        return (
          <tr key={step}>
            <td className="px-4 py-2.5 whitespace-nowrap">
              <CopyCode value={`--space-${step}`} />
            </td>
            <td className="px-4 py-2.5 whitespace-nowrap">
              <CopyCode value={`p-${n}`} className="text-ui-xs text-site-muted" />
              <span className="text-ui-xs text-site-subtle"> · </span>
              <CopyCode value={`gap-${n}`} className="text-ui-xs text-site-muted" />
            </td>
            <td className="px-4 py-2.5">
              <div style={{ width: `var(--space-${step})` }} className="h-3 rounded-2xs bg-site-nav" />
            </td>
            <td className="px-4 py-2.5 font-mono whitespace-nowrap text-site-muted">
              {value === '0' ? '0' : value}
            </td>
          </tr>
        );
      })}
    </Table>
  );
}

const BORDER_STEPS: { step: string; tailwind: string }[] = [
  { step: 'none', tailwind: 'border-0' },
  { step: 'default', tailwind: 'border' },
  { step: 'thick', tailwind: 'border-2' },
  { step: 'thicker', tailwind: 'border-4' },
];

export function BorderWidthScale() {
  return (
    <Table head={['Token', 'Tailwind', 'Example', 'Value']}>
      {BORDER_STEPS.map(({ step, tailwind }) => {
        const value = rawToken(`border-width-${step}`);
        return (
          <tr key={step}>
            <td className="px-4 py-3 whitespace-nowrap">
              <CopyCode value={`--border-width-${step}`} />
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              <CopyCode value={tailwind} className="text-ui-xs text-site-muted" />
            </td>
            <td className="px-4 py-3">
              <div
                style={{ borderWidth: `var(--border-width-${step})` }}
                className="h-10 w-20 rounded-md border-solid border-site-nav bg-site-bg"
              />
            </td>
            <td className="px-4 py-3 font-mono whitespace-nowrap text-site-muted">{value}</td>
          </tr>
        );
      })}
    </Table>
  );
}

// Default rhythm, shown on a small form: 8px inside a field (label → input), 16px between fields.
export function SpacingInContext() {
  return (
    <figure className="not-prose mb-4 rounded-xl border border-site-border p-6">
      <div className="max-w-sm space-y-4 rounded-xl border border-border bg-background p-6">
        {['Agent name', 'Model'].map((label) => (
          <div key={label} className="space-y-2">
            <p className="text-ui font-medium text-foreground">{label}</p>
            <div className="h-10 rounded-md border border-input bg-background" />
          </div>
        ))}
        <div className="flex justify-end gap-2 pt-2">
          <span className="rounded-md border border-border px-3 py-2 text-ui text-foreground">Cancel</span>
          <span className="rounded-md bg-primary px-3 py-2 text-ui text-primary-foreground">Create agent</span>
        </div>
      </div>
      <figcaption className="mt-3 text-ui-xs text-site-muted">
        Label → input <code className="font-mono">gap-2</code> (8px) · field → field{' '}
        <code className="font-mono">gap-4</code> (16px) · card padding <code className="font-mono">p-6</code> (24px) ·
        buttons <code className="font-mono">gap-2</code>
      </figcaption>
    </figure>
  );
}
