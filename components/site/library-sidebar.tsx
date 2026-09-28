'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type * as PageTree from 'fumadocs-core/page-tree';
import { cn } from '@/lib/utils';

// Plain sidebar: "Start here", then uppercase section labels with their pages.
export function LibrarySidebar({ nodes }: { nodes: PageTree.Node[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Library" className="flex flex-col gap-0.5">
      {nodes.map((node, i) => {
        if (node.type === 'separator') {
          const isEmpty = nodes[i + 1] === undefined || nodes[i + 1].type === 'separator';
          return (
            <div key={i} className="mt-6 mb-1 px-3">
              <p className="text-caption uppercase tracking-wider text-site-subtle">{node.name}</p>
              {isEmpty && <p className="mt-2 text-body-sm text-site-subtle">Coming soon</p>}
            </div>
          );
        }
        if (node.type === 'page') {
          const active = pathname === node.url;
          return (
            <Link
              key={node.url}
              href={node.url}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'rounded-lg px-3 py-1.5 text-body transition-colors duration-150',
                active
                  ? 'bg-site-active text-site-fg'
                  : 'text-site-muted hover:bg-site-hover hover:text-site-fg',
              )}
            >
              {node.name}
            </Link>
          );
        }
        return null;
      })}
    </nav>
  );
}
