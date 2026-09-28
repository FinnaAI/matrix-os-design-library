import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { source } from '@/lib/source';
import { getMDXComponents } from '@/components/mdx';

// Shared page body for Library and Guides: title, lead, MDX content. No page chrome.
export function DocPage({ slugs }: { slugs: string[] }) {
  const page = source.getPage(slugs);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <article className="min-w-0">
      <h1 className="text-h2 text-site-fg">{page.data.title}</h1>
      {page.data.description && (
        <p className="mt-3 text-body-lg text-site-muted">{page.data.description}</p>
      )}
      <div className="prose mt-12 max-w-none">
        <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
      </div>
    </article>
  );
}

export function docMetadata(slugs: string[]): Metadata {
  const page = source.getPage(slugs);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}

export function docParams(section: string) {
  return source
    .getPages()
    .filter((page) => page.slugs[0] === section)
    .map((page) => ({ slug: page.slugs.slice(1) }));
}
