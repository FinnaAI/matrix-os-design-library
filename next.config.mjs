import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Hide the Next.js dev badge; it covered the sidebar footer.
  devIndicators: false,
  // No landing page yet: the site opens on the Library.
  async redirects() {
    return [{ source: '/', destination: '/library', permanent: false }];
  },
};

export default withMDX(config);
