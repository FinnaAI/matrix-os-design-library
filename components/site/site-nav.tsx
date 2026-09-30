'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RabbitMark } from '@/components/brand/rabbit-mark';
import { GitHubMark } from '@/components/brand/github-mark';
import { githubUrl } from '@/lib/shared';
import { cn } from '@/lib/utils';

const sections = [
  { label: 'Library', href: '/library' },
  { label: 'Guides', href: '/guides' },
];

// Floating pill navigation (logo · Library · Guides · GitHub).
export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4">
      <nav
        aria-label="Main"
        className="flex items-center gap-1 rounded-xl bg-site-nav p-1.5 shadow-md"
      >
        <Link
          href="/library"
          aria-label="Matrix OS Design System"
          className="mr-1 flex size-8 items-center justify-center rounded-full bg-site-nav-fg text-brand"
        >
          <RabbitMark className="h-5" />
        </Link>
        {sections.map((section) => {
          const active = pathname.startsWith(section.href);
          return (
            <Link
              key={section.href}
              href={section.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'rounded-lg px-4 py-1.5 text-ui transition-colors duration-150',
                active
                  ? 'bg-site-nav-active font-medium text-site-nav-fg'
                  : 'text-site-nav-muted hover:text-site-nav-fg',
              )}
            >
              {section.label}
            </Link>
          );
        })}
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub repository"
          className="ml-1 flex size-8 items-center justify-center rounded-lg text-site-nav-muted transition-colors duration-150 hover:text-site-nav-fg"
        >
          <GitHubMark className="size-4" />
        </a>
      </nav>
    </header>
  );
}
