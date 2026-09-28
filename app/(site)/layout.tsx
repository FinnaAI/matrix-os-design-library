import { SiteNav } from '@/components/site/site-nav';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <div className="mx-auto w-full max-w-6xl px-6 pt-28 pb-30">{children}</div>
    </>
  );
}
