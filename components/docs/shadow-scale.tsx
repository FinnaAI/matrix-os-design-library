import { rawToken } from '@/lib/tokens';
import { CopyCode } from './copy';

// Elevation steps as a table: token + Tailwind class, a live tile, and the value read from tokens.css.
// The value is shown with the shadow ink resolved (rgb(36 35 35 / 0.05)) so it reads as plain CSS.
export function ShadowScale({ steps }: { steps: string[] }) {
  const ink = rawToken('shadow-color');
  return (
    <div className="not-prose mb-4 overflow-x-auto rounded-xl border border-site-border">
      <table className="w-full text-left text-ui">
        <thead>
          <tr className="border-b border-site-border">
            {['Token', 'Example', 'Value'].map((h) => (
              <th key={h} className="px-4 py-3 text-ui-xs font-normal text-site-subtle">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-site-border">
          {steps.map((step) => {
            const value = rawToken(`elevation-${step}`).replaceAll('var(--shadow-color)', ink);
            return (
              <tr key={step}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <CopyCode value={`--elevation-${step}`} />
                  <CopyCode value={`shadow-${step}`} className="mt-1 block text-ui-xs text-site-muted" />
                </td>
                {/* Extra bottom padding leaves room for the larger shadows to show. */}
                <td className="bg-site-hover px-6 pt-5 pb-8">
                  <div
                    style={{ boxShadow: `var(--elevation-${step})` }}
                    className="h-14 w-24 rounded-lg bg-background"
                  />
                </td>
                <td className="px-4 py-3 font-mono text-ui-xs text-site-muted">{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
