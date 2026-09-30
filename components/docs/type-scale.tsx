import type { ReactNode } from 'react';
import { rawToken } from '@/lib/tokens';
import { cn } from '@/lib/utils';
import { CopyCode } from './copy';

export type TypeRow = {
  /** Classes a developer writes, shown and copied, e.g. "text-ui font-medium". */
  code: string;
  /** Token stem in tokens.css (type-<token>-size / -leading) to show size / line height. */
  token?: string;
  /** Shown instead of size / line height, e.g. a weight "500". */
  meta?: string;
  /** Classes applied to the example (defaults to `code`). */
  exampleClassName?: string;
  example: ReactNode;
};

function sizeLabel(token: string) {
  const size = rawToken(`type-${token}-size`);
  const leading = rawToken(`type-${token}-leading`);
  // Brand leadings are ratios (1.15); product leadings are px.
  return leading.endsWith('px') ? `${parseFloat(size)} / ${parseFloat(leading)}` : `${parseFloat(size)} / ×${leading}`;
}

// Class · size (read from tokens.css) · live example.
export function TypeTable({ rows, head = ['Class', 'Size', 'Example'] }: { rows: TypeRow[]; head?: string[] }) {
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
        <tbody className="divide-y divide-site-border">
          {rows.map(({ code, token, meta, exampleClassName, example }) => (
            <tr key={code}>
              <td className="px-4 py-3 whitespace-nowrap">
                <CopyCode value={code} className="text-ui-xs" />
              </td>
              <td className="px-4 py-3 font-mono text-ui-xs whitespace-nowrap text-site-muted">
                {token ? sizeLabel(token) : meta}
              </td>
              <td className={cn('px-4 py-3 text-foreground', exampleClassName ?? code)}>{example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// One family, big "Aa" plus a line of UI text, with the class that selects it.
export function FontSpecimens() {
  const fonts = [
    {
      name: 'Geist',
      role: 'Sans · all product UI',
      cls: 'font-sans',
      sample: 'Connect a model to start chatting with your agents.',
    },
    {
      name: 'Geist Mono',
      role: 'Mono · code, paths, IDs, logs',
      cls: 'font-mono',
      sample: '~/agents/research · run 4f2a91 · 1.2s',
    },
    {
      name: 'Bricolage Grotesque',
      role: 'Display · brand moments only',
      cls: 'font-heading',
      sample: 'Your cloud computer, run by agents.',
    },
  ];
  return (
    <div className="not-prose mb-4 grid gap-4 sm:grid-cols-3">
      {fonts.map(({ name, role, cls, sample }) => (
        <figure key={name} className="rounded-xl border border-site-border p-5">
          <p className="text-ui-cap text-site-subtle uppercase">{role}</p>
          <p className={cn('mt-3 text-brand-h1 font-normal text-site-fg', cls)}>Aa</p>
          <p className={cn('mt-3 text-ui text-site-fg', cls)}>{sample}</p>
          <figcaption className="mt-4 flex items-center justify-between text-ui-xs text-site-muted">
            {name}
            <CopyCode value={cls} className="text-ui-xs" />
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

// Proportional vs tabular figures in a right-aligned column.
export function TabularNumbers() {
  const rows = ['1,204.50', '1,111.00', '98.10'];
  return (
    <div className="not-prose mb-4 overflow-x-auto rounded-xl border border-site-border">
      <table className="w-full text-ui">
        <thead>
          <tr className="border-b border-site-border">
            <th className="px-4 py-3 text-right text-ui-xs font-normal text-site-subtle">Proportional (default)</th>
            <th className="px-4 py-3 text-right text-ui-xs font-normal text-site-subtle">
              Tabular · <CopyCode value="tabular-nums" className="text-ui-xs" />
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-site-border">
          {rows.map((n) => (
            <tr key={n}>
              <td className="px-4 py-2.5 text-right text-foreground">{n}</td>
              <td className="px-4 py-2.5 text-right text-foreground tabular-nums">{n}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
