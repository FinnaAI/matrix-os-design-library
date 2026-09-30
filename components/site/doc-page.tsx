import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { appName, previewImage } from '@/lib/shared';
import { source } from '@/lib/source';
import { getMDXComponents } from '@/components/mdx';

// Shared page body for Library and Guides: title, lead, MDX content. No page chrome.
export function DocPage({ slugs }: { slugs: string[] }) {
  const page = source.getPage(slugs);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <article className="min-w-0">
      <h1 className="text-site-title text-site-fg">{page.data.title}</h1>
      {page.data.description && (
        <p className="mt-3 text-ui-lg text-site-muted">{page.data.description}</p>
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
  const { title, description } = page.data;
  // Each page's own title and summary in link previews. A page-level openGraph replaces the site one
  // entirely, so the preview image (app/opengraph-image.tsx) is named again here.
  const shared = { title: `${title} · ${appName}`, description, images: [previewImage] };
  return {
    title,
    description,
    openGraph: { ...shared, type: 'website', siteName: appName, url: page.url },
    twitter: { ...shared, card: 'summary_large_image' },
  };
}

export function docParams(section: string) {
  return source
    .getPages()
    .filter((page) => page.slugs[0] === section)
    .map((page) => ({ slug: page.slugs.slice(1) }));
}
