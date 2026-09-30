import { createCn } from 'cn/config';

// shadcn's class-name helper (clsx + tailwind-merge), taught the Matrix class names that Tailwind's
// defaults don't include. Without this, cn('text-ui', 'text-muted-foreground') treats both as colors
// and drops the size. Copy this file into any app that uses the Matrix tokens.
export const cn = createCn({
  extend: {
    theme: {
      text: [
        'ui-lg', 'ui', 'ui-sm', 'ui-xs', 'ui-cap',
        'heading', 'heading-sm', 'metric', 'metric-sm',
        'brand-display', 'brand-h1', 'brand-h2', 'brand-h3', 'brand-label',
        'site-title',
      ],
      shadow: ['xs-top', '3xl'],
      radius: ['2xs'],
    },
  },
});
