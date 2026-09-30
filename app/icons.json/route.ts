import { icons } from 'lucide';
import meta from '@/lib/lucide-meta.json';

// Every Lucide icon as [name, drawing, category, tags], for the Iconography page's browser.
// Built once at build time (force-static), so ~1,900 icons never ship in a page bundle.
// `lucide` (the plain package) is used here because lucide-react's components don't expose their data.
export const dynamic = 'force-static';

// lib/lucide-meta.json: { IconName: [category, ...searchTags] }, a snapshot of lucide.dev/api/categories
// and /api/tags (2026-09-30). Icons missing from it are deprecated aliases that repeat another drawing.
const META = meta as Record<string, string[]>;

export function GET() {
  const entries = Object.entries(icons)
    .filter(([name]) => name in META)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, node]) => {
      const [category, ...tags] = META[name];
      // React needs a key per shape when it draws them.
      const keyed = node.map(([tag, attrs], i) => [tag, { ...attrs, key: String(i) }]);
      return [name, keyed, category, tags];
    });
  return Response.json(entries);
}
