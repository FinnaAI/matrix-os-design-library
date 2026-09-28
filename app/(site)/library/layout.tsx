import type * as PageTree from 'fumadocs-core/page-tree';
import { source } from '@/lib/source';
import { LibrarySidebar } from '@/components/site/library-sidebar';

function libraryNodes(): PageTree.Node[] {
  const folder = source
    .getPageTree()
    .children.find(
      (node): node is PageTree.Folder =>
        node.type === 'folder' &&
        node.children.some((child) => child.type === 'page' && child.url === '/library'),
    );
  return folder?.children ?? [];
}

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-12 md:grid-cols-[15rem_1fr] md:gap-20">
      <aside className="md:sticky md:top-28 md:max-h-(--site-sidebar-max-h) md:self-start md:overflow-y-auto">
        <LibrarySidebar nodes={libraryNodes()} />
      </aside>
      {children}
    </div>
  );
}
