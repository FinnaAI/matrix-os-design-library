export const appName = 'Matrix OS Design System';

/** The link-preview image (app/opengraph-image.tsx), with its size and type spelled out:
 *  Slack and others skip images whose size they can't read from the tags. */
export const previewImage = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: 'Matrix OS Design System',
};

/** The public production address (Vercel). Used for link previews. */
export const siteUrl = 'https://matrix-design-system.vercel.app';

export const gitConfig = {
  user: 'sahar-nouri-1',
  repo: 'Matrix_design-system',
  branch: 'main',
};

export const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;
