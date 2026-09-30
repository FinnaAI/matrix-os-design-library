import type { ReactNode } from 'react';
import Link from 'next/link';
import { Check, X } from 'lucide-react';

// ✓ / ✗ guideline rows, Matrix-style.
export function Guidelines({ children }: { children: ReactNode }) {
  return <ul className="not-prose mb-6 flex flex-col gap-3">{children}</ul>;
}

export function Guideline({ children, dont = false }: { children: ReactNode; dont?: boolean }) {
  const Icon = dont ? X : Check;
  return (
    <li className="flex gap-3 text-ui text-site-fg">
      <Icon aria-label={dont ? "Don't" : 'Do'} className="mt-1 size-4 shrink-0 text-site-muted" />
      <span className="[&_code]:rounded [&_code]:bg-site-code [&_code]:px-1 [&_code]:font-mono [&_code]:text-ui">
        {children}
      </span>
    </li>
  );
}

// Related pages as preview cards.
export function Related({ children }: { children: ReactNode }) {
  return <div className="not-prose grid grid-cols-2 gap-4 sm:grid-cols-3">{children}</div>;
}

export function RelatedCard({ title, href, children }: { title: string; href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="flex flex-col overflow-hidden rounded-xl border border-site-border transition-colors duration-150 hover:bg-site-hover"
    >
      <span className="flex h-24 items-center justify-center border-b border-site-border">{children}</span>
      <span className="px-4 py-3 text-ui text-site-fg">{title}</span>
    </Link>
  );
}
