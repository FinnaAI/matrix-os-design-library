'use client';

import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import type { IconNode } from 'lucide-react';
import { IconFromNode } from '@/components/ui/icon';
import { MATRIX_ICONS } from '@/lib/matrix-icons';
import { cn } from '@/lib/utils';
import { useCopy } from './copy';

type Entry = [name: string, node: IconNode, category: string, tags: string[]];

const PAGE = 120;
const matrixSet = new Set(MATRIX_ICONS);

// Lucide category slugs → display titles. Anything missing is title-cased from the slug.
const TITLES: Record<string, string> = {
  'food-beverage': 'Food & beverage',
  account: 'Account & users',
  multimedia: 'Media',
};

function title(slug: string) {
  return TITLES[slug] ?? slug.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

// Searchable grid of every Lucide icon, grouped by Lucide's own categories. Data comes from
// /icons.json (built statically) so this page's bundle stays small. Click a tile to copy its import name.
export function IconBrowser() {
  const [icons, setIcons] = useState<Entry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    let cancelled = false;
    fetch('/icons.json')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data: Entry[]) => !cancelled && setIcons(data))
      .catch((error) => {
        console.warn('Could not load icons', error);
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const q = deferredQuery.trim().toLowerCase();
  const searching = q !== '';

  const { matrix, categories, total } = useMemo(() => {
    const compact = q.replace(/\s+/g, '');
    // Match the name ("CircleAlert") or any of Lucide's tags ("warning", "error").
    const hits = (icons ?? []).filter(
      ([name, , , tags]) => !q || name.toLowerCase().includes(compact) || tags.some((t) => t.includes(q)),
    );
    const byCategory = new Map<string, Entry[]>();
    for (const entry of hits) {
      const list = byCategory.get(entry[2]) ?? [];
      list.push(entry);
      byCategory.set(entry[2], list);
    }
    return {
      matrix: hits.filter(([name]) => matrixSet.has(name)),
      categories: [...byCategory].sort(([a], [b]) => title(a).localeCompare(title(b))),
      total: hits.length,
    };
  }, [icons, q]);

  return (
    <div className="not-prose mb-8">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or meaning (e.g. email, warning, user)"
        aria-label="Search icons"
        className="mb-4 w-full rounded-lg border border-site-border bg-site-bg px-3 py-2 text-body-sm text-site-fg placeholder:text-site-subtle"
      />

      {failed && <p className="text-body-sm text-site-muted">Icons couldn&apos;t load. Reload the page to try again.</p>}
      {!icons && !failed && <p className="text-body-sm text-site-muted">Loading icons…</p>}

      {icons && (
        <>
          <IconGroup
            // Remount on a new search so each result set starts collapsed to one page.
            key={`matrix-${q}`}
            title="Used in Matrix"
            note="Already in the product. Reach for these first."
            icons={matrix}
            defaultOpen
          />
          <p className="mt-6 mb-2 text-caption text-site-subtle">
            {searching ? `${total.toLocaleString('en')} matches by category` : 'All icons by category'}
          </p>
          {categories.map(([slug, list]) => (
            <IconGroup key={`${slug}-${q}`} title={title(slug)} icons={list} defaultOpen={searching} />
          ))}
          {total === 0 && <p className="text-body-sm text-site-muted">No icons match “{deferredQuery}”.</p>}
        </>
      )}
    </div>
  );
}

function IconGroup({
  title,
  note,
  icons,
  defaultOpen = false,
}: {
  title: string;
  note?: string;
  icons: Entry[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [shown, setShown] = useState(PAGE);
  if (icons.length === 0) return null;

  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-baseline gap-2 py-1.5 text-left"
      >
        <span aria-hidden="true" className={cn('text-caption text-site-subtle transition-transform', open && 'rotate-90')}>
          ›
        </span>
        <span className="text-caption font-medium tracking-wide text-site-fg uppercase">{title}</span>
        <span className="text-caption text-site-subtle">{icons.length.toLocaleString('en')}</span>
        {note && <span className="ml-auto hidden text-caption text-site-subtle sm:inline">{note}</span>}
      </button>

      {open && (
        <div className="mt-2 mb-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
            {icons.slice(0, shown).map(([name, node]) => (
              <IconTile key={name} name={name} node={node} />
            ))}
          </div>
          {shown < icons.length && (
            <button
              type="button"
              onClick={() => setShown(shown + PAGE * 2)}
              className="mt-3 rounded-lg border border-site-border px-3 py-1.5 text-body-sm text-site-fg hover:bg-site-hover"
            >
              Show more ({(icons.length - shown).toLocaleString('en')} left)
            </button>
          )}
        </div>
      )}
    </section>
  );
}

function IconTile({ name, node }: { name: string; node: IconNode }) {
  const { copied, copy } = useCopy();
  return (
    <button
      type="button"
      onClick={() => copy(name)}
      title={`Copy ${name}`}
      aria-label={`Copy ${name}`}
      className="flex h-20 flex-col justify-between rounded-lg border border-site-border p-2 text-left text-site-fg transition-colors duration-150 hover:bg-site-hover"
    >
      <span className="truncate text-caption text-site-muted">{copied ? 'Copied' : name}</span>
      <span className="flex justify-center pb-2">
        <IconFromNode node={node} />
      </span>
    </button>
  );
}
