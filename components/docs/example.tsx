'use client';

import { useState, type ReactNode } from 'react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { cn } from '@/lib/utils';

// A live component preview with a "Show code" toggle.
// The preview sits on the Matrix page background so components show in their real context.
export function Example({
  title,
  subtitle,
  code,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  /** Copy-paste code for exactly what the preview shows. */
  code: string;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <figure className="not-prose mb-6 overflow-hidden rounded-xl border border-site-border">
      <figcaption className="flex items-center justify-between gap-4 border-b border-site-border px-4 py-2.5">
        <span className="text-ui font-medium text-site-fg">
          {title}
          {subtitle && <span className="ml-2 font-normal text-site-subtle">{subtitle}</span>}
        </span>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="rounded-md px-2 py-1 text-ui-xs text-site-muted transition-colors duration-120 hover:bg-site-hover hover:text-site-fg"
        >
          {open ? 'Hide code' : 'Show code'}
        </button>
      </figcaption>
      <div className={cn('flex min-h-36 flex-wrap items-center justify-center gap-6 bg-background p-8', className)}>
        {children}
      </div>
      {open && (
        <div className="border-t border-site-border [&_figure]:my-0 [&_figure]:rounded-none [&_figure]:border-0">
          <DynamicCodeBlock lang="tsx" code={code.trim()} />
        </div>
      )}
    </figure>
  );
}

/** A caption under an item inside an Example, e.g. the size name under each avatar. */
export function ExampleLabel({ children }: { children: ReactNode }) {
  return <span className="mt-2 block text-center text-ui-xs text-site-subtle">{children}</span>;
}
