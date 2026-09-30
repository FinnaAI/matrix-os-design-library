import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';
import { appName } from '@/lib/shared';
import './global.css';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage' });
const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: { default: appName, template: `%s · ${appName}` },
  description: 'Foundations, components and guidelines for building Matrix OS.',
  icons: { icon: '/brand/rabbit-mark.svg' },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${geist.variable} ${geistMono.variable} font-sans`}
      suppressHydrationWarning
    >
      {/* Browser extensions (e.g. ColorZilla) add attributes to <body> before React loads; don't report that as an error. */}
      <body className="min-h-screen bg-site-bg text-site-fg" suppressHydrationWarning>
        {/* Light only: theme switching (next-themes) is off, which also removes its inline
            <script> that React 19 flags as an error in development. */}
        <RootProvider theme={{ enabled: false }}>{children}</RootProvider>
      </body>
    </html>
  );
}
