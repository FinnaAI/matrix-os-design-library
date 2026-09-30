import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';
import { appName, siteUrl } from '@/lib/shared';
import './global.css';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage' });
const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

const description =
  'Tokens, foundations and components for Matrix OS: colors, typography, spacing, radius, elevation and icons, with copy-paste code.';

export const metadata: Metadata = {
  // Makes the preview image (app/opengraph-image.tsx) an absolute URL, which chat apps need.
  metadataBase: new URL(siteUrl),
  title: { default: appName, template: `%s · ${appName}` },
  description,
  icons: { icon: '/brand/rabbit-mark.svg' },
  openGraph: { type: 'website', siteName: appName, title: appName, description, url: '/' },
  twitter: { card: 'summary_large_image', title: appName, description },
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
