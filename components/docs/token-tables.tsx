import type { ReactNode } from 'react';
import { contrast, tailwindUtility, tokenTarget, type UtilityPrefix } from '@/lib/tokens';
import { CopyCode } from './copy';

function Dot({ token }: { token: string }) {
  return (
    <span
      aria-hidden="true"
      style={{ background: `var(--${token})` }}
      className="inline-block size-3 shrink-0 rounded-full border border-site-border"
    />
  );
}


function Table({ head, children }: { head: string[]; children: ReactNode }) {
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

export type SemanticRole = {
  token: string;
  use: string;
  /** Measure contrast against this token and show the ratio. */
  on?: string;
  status?: 'provisional' | 'pending';
  /** Override the Tailwind prefix when the default (text roles → `text-`, edges → `border-`, else `bg-`) is wrong. */
  prefix?: UtilityPrefix;
};

// Role (with the scale step it maps to) → its Tailwind class → what it's for.
// "Maps to" is read from tokens.css; the class is checked against @theme in app/global.css.
export function SemanticRoles({ roles }: { roles: SemanticRole[] }) {
  return (
    <Table head={['Role', 'Tailwind', 'Use']}>
      {roles.map(({ token, use, on, status, prefix }) => {
        const target = tokenTarget(token);
        return (
          <tr key={token}>
            <td className="px-4 py-3 whitespace-nowrap">
              <span className="flex items-center gap-2">
                <Dot token={token} />
                <CopyCode value={`--${token}`} />
              </span>
              <code className="mt-1 block pl-5 font-mono text-ui-xs text-site-subtle">
                {target ? `→ --${target}` : '—'}
              </code>
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              <CopyCode value={tailwindUtility(token, prefix)} />
            </td>
            <td className="px-4 py-3 text-site-muted">
              {use}
              {on && ` ${contrast(token, on).toFixed(2)}:1 on --${on}.`}
              {status && (
                <span className="ml-2 rounded-md bg-site-hover px-1.5 py-0.5 text-ui-xs text-site-fg">
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

// Tint sets: fill + border + text, previewed as a chip. The parts stack in one cell (Tailwind class →
// scale step) so long class names fit; the chip column copies all three classes at once.
export function TintTable({ variants }: { variants: string[] }) {
  return (
    <Table head={['Variant', 'Fill · border · text', 'On a chip']}>
      {variants.map((variant) => {
        const [fill, border, text] = ['fill', 'border', 'text'].map((part) => `tint-${variant}-${part}`);
        return (
          <tr key={variant}>
            <td className="px-4 py-3 whitespace-nowrap">
              <span className="block text-site-fg">{variant}</span>
              <code className="font-mono text-ui-xs text-site-subtle">--tint-{variant}-*</code>
            </td>
            <td className="space-y-1 px-4 py-3 whitespace-nowrap">
              {[fill, border, text].map((token) => (
                <span key={token} className="flex items-center gap-2" title={`--${token}`}>
                  <Dot token={token} />
                  <CopyCode value={tailwindUtility(token)} className="text-ui-xs" />
                  <code className="font-mono text-ui-xs text-site-subtle">→ --{tokenTarget(token)}</code>
                </span>
              ))}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              <span
                style={{
                  background: `var(--${fill})`,
                  borderColor: `var(--${border})`,
                  color: `var(--${text})`,
                }}
                className="inline-flex rounded-md border px-2 py-0.5 text-ui-xs font-medium"
              >
                Label
              </span>
              <span className="ml-2 text-ui-xs text-site-subtle">{contrast(text, fill).toFixed(1)}:1</span>
              <CopyCode
                value={[fill, border, text].map((token) => tailwindUtility(token)).join(' ')}
                label="Copy classes"
                className="mx-0 mt-1 block px-0 font-sans text-ui-xs text-site-muted underline underline-offset-2"
              />
            </td>
          </tr>
        );
      })}
    </Table>
  );
}
