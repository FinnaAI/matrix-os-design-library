import type { ReactNode } from 'react';
import { contrast, tokenTarget } from '@/lib/tokens';

function Dot({ token }: { token: string }) {
  return (
    <span
      aria-hidden="true"
      style={{ background: `var(--${token})` }}
      className="inline-block size-3 shrink-0 rounded-full border border-site-border"
    />
  );
}

function TokenName({ token }: { token: string }) {
  return <code className="font-mono text-body-sm text-site-fg">--{token}</code>;
}

function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="not-prose mb-4 overflow-x-auto rounded-xl border border-site-border">
      <table className="w-full text-left text-body-sm">
        <thead>
          <tr className="border-b border-site-border">
            {head.map((h) => (
              <th key={h} className="px-4 py-3 text-caption font-normal text-site-subtle">
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

export type SemanticRole = {
  token: string;
  use: string;
  /** Measure contrast against this token and show the ratio. */
  on?: string;
  status?: 'provisional' | 'pending';
};

// Role → the scale step it maps to → what it's for. "Maps to" is read from tokens.css.
export function SemanticRoles({ roles }: { roles: SemanticRole[] }) {
  return (
    <Table head={['Role', 'Maps to', 'Use']}>
      {roles.map(({ token, use, on, status }) => {
        const target = tokenTarget(token);
        return (
          <tr key={token}>
            <td className="px-4 py-3 whitespace-nowrap">
              <span className="flex items-center gap-2">
                <Dot token={token} />
                <TokenName token={token} />
              </span>
            </td>
            <td className="px-4 py-3 font-mono whitespace-nowrap text-site-muted">
              {target ? `--${target}` : '—'}
            </td>
            <td className="px-4 py-3 text-site-muted">
              {use}
              {on && ` ${contrast(token, on).toFixed(2)}:1 on --${on}.`}
              {status && (
                <span className="ml-2 rounded-md bg-site-hover px-1.5 py-0.5 text-caption text-site-fg">
                  {status === 'pending' ? 'Decision pending' : 'Provisional'}
                </span>
              )}
            </td>
          </tr>
        );
      })}
    </Table>
  );
}

// Tint sets: fill + border + text, previewed as a chip. Cells show the scale step each part maps to.
export function TintTable({ variants }: { variants: string[] }) {
  return (
    <Table head={['Variant', 'Fill', 'Border', 'Text', 'On a chip']}>
      {variants.map((variant) => {
        const [fill, border, text] = ['fill', 'border', 'text'].map((part) => `tint-${variant}-${part}`);
        return (
          <tr key={variant}>
            <td className="px-4 py-3 whitespace-nowrap">
              <span className="block text-site-fg">{variant}</span>
              <code className="font-mono text-caption text-site-subtle">--tint-{variant}-*</code>
            </td>
            {[fill, border, text].map((token) => (
              <td key={token} className="px-4 py-3 whitespace-nowrap" title={`--${token}`}>
                <span className="flex items-center gap-2">
                  <Dot token={token} />
                  <code className="font-mono text-caption text-site-muted">--{tokenTarget(token)}</code>
                </span>
              </td>
            ))}
            <td className="px-4 py-3 whitespace-nowrap">
              <span
                style={{
                  background: `var(--${fill})`,
                  borderColor: `var(--${border})`,
                  color: `var(--${text})`,
                }}
                className="inline-flex rounded-md border px-2 py-0.5 text-caption font-medium"
              >
                Label
              </span>
              <span className="ml-2 text-caption text-site-subtle">{contrast(text, fill).toFixed(1)}:1</span>
            </td>
          </tr>
        );
      })}
    </Table>
  );
}
