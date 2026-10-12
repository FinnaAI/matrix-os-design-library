import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { RabbitMark } from '@/components/brand/rabbit-mark';
import { cn } from '@/lib/utils';

// Specimens for the Logo page: the four looks, clear space, sizes, app icons and the don'ts.
// Tiles are drawn with brand-scale steps (documentation only); captions use site chrome.

function Caption({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <figcaption className="mt-3 flex flex-col gap-1">
      <span className="text-ui font-medium text-site-fg">{title}</span>
      {children && (
        <span className="text-ui-xs text-site-muted [&_code]:rounded [&_code]:bg-site-code [&_code]:px-1 [&_code]:font-mono">
          {children}
        </span>
      )}
    </figcaption>
  );
}

const LOOKS = [
  {
    name: 'Forest (default)',
    tile: 'border border-site-border bg-background text-teal-800',
    classes: 'text-teal-800',
    use: 'Product UI, light launch screen, print and marketing on light',
    contrast: '13.1:1',
  },
  {
    name: 'Sentinel',
    tile: 'bg-teal-800 text-neutral-25',
    classes: 'bg-teal-800 text-neutral-25',
    use: 'App icons, favicon, launch screen (dark)',
    contrast: '13.1:1',
  },
  {
    name: 'Signal',
    tile: 'bg-gold-300 text-teal-800',
    classes: 'bg-gold-300 text-teal-800',
    use: 'Marketing only, never in the product',
    contrast: '8.4:1',
  },
];

/** The three approved color pairs. */
export function LogoLooks() {
  return (
    <div className="not-prose mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
      {LOOKS.map((look) => (
        <figure key={look.name}>
          <div className={cn('flex aspect-square items-center justify-center rounded-xl', look.tile)}>
            <RabbitMark className="h-16 w-auto" />
          </div>
          <Caption title={look.name}>
            <span className="flex flex-wrap gap-1">
              {look.classes.split(' ').map((cls) => (
                <code key={cls}>{cls}</code>
              ))}
            </span>
            <span className="block">{look.use}</span>
            <span className="block">{look.contrast}</span>
          </Caption>
        </figure>
      ))}
    </div>
  );
}

const MARKETING = [
  { name: 'Sentinel', tile: 'bg-teal-800 text-neutral-25', classes: 'bg-teal-800 text-neutral-25', contrast: '13.1:1' },
  { name: 'Wheat on Forest', tile: 'bg-teal-800 text-gold-300', classes: 'bg-teal-800 text-gold-300', contrast: '8.4:1' },
  { name: 'Signal', tile: 'bg-gold-300 text-teal-800', classes: 'bg-gold-300 text-teal-800', contrast: '8.4:1' },
  { name: 'Forest', tile: 'border border-site-border bg-neutral-25 text-teal-800', classes: 'bg-neutral-25 text-teal-800', contrast: '13.1:1' },
];

/** The only rabbit and background pairs marketing uses, plus the wordmark on Forest. */
export function MarketingPairs() {
  return (
    <div className="not-prose mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
      {MARKETING.map((pair) => (
        <figure key={pair.name}>
          <div className={cn('flex aspect-square items-center justify-center rounded-xl', pair.tile)}>
            <RabbitMark className="h-1/2 w-auto" />
          </div>
          <Caption title={pair.name}>
            <span className="flex flex-wrap gap-1">
              {pair.classes.split(' ').map((cls) => (
                <code key={cls}>{cls}</code>
              ))}
            </span>
            <span className="block">{pair.contrast}</span>
          </Caption>
        </figure>
      ))}
      <figure>
        <div className="flex aspect-square items-center justify-center rounded-xl bg-teal-800 text-gold-300">
          <span className="font-heading text-brand-h2 font-semibold">Matrix OS</span>
        </div>
        <Caption title="Wordmark, Wheat on Forest">
          <span className="flex flex-wrap gap-1">
            <code>font-heading</code>
            <code>text-gold-300</code>
          </span>
          <span className="block">8.4:1</span>
        </Caption>
      </figure>
    </div>
  );
}

/** One ear-width (1/8 of the mark's height) of clear space on every side. */
export function LogoClearSpace() {
  return (
    <figure className="not-prose mb-6 flex flex-col items-center rounded-xl border border-site-border bg-background p-8">
      <div className="relative border border-dashed border-site-subtle p-4">
        <span className="absolute inset-x-0 top-0 h-4 bg-tint-brand-fill" aria-hidden="true" />
        <span className="absolute inset-x-0 bottom-0 h-4 bg-tint-brand-fill" aria-hidden="true" />
        <span className="absolute inset-y-0 left-0 w-4 bg-tint-brand-fill" aria-hidden="true" />
        <span className="absolute inset-y-0 right-0 w-4 bg-tint-brand-fill" aria-hidden="true" />
        <RabbitMark className="relative h-32 w-auto text-teal-800" />
      </div>
      <figcaption className="mt-4 text-center text-ui-xs text-site-muted">
        128px mark · 16px clear space on every side (one ear-width, 1/8 of the height)
      </figcaption>
    </figure>
  );
}

const SIZES = [
  { cls: 'h-4', px: 16, note: 'Minimum (PROVISIONAL)' },
  { cls: 'h-5', px: 20, note: 'Nav, toolbar' },
  { cls: 'h-6', px: 24, note: 'Headers' },
  { cls: 'h-8', px: 32, note: 'Sign-in, dialogs' },
  { cls: 'h-12', px: 48, note: 'Empty states' },
  { cls: 'h-16', px: 64, note: 'Brand moments' },
];

/** Screen sizes, measured by height. */
export function LogoSizes() {
  return (
    <div className="not-prose mb-6 flex flex-wrap items-end gap-8 rounded-xl border border-site-border bg-background p-8">
      {SIZES.map((size) => (
        <figure key={size.cls} className="flex flex-col items-center">
          <RabbitMark className={cn(size.cls, 'w-auto text-teal-800')} />
          <figcaption className="mt-3 text-center text-ui-xs text-site-muted">
            <code className="font-mono text-site-fg">{size.cls}</code> · {size.px}px
            <span className="block">{size.note}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function IconFigure({ title, children, note }: { title: string; children: ReactNode; note?: ReactNode }) {
  return (
    <figure className="flex flex-col items-center text-center">
      <div className="flex h-32 items-center justify-center">{children}</div>
      <Caption title={title}>{note}</Caption>
    </figure>
  );
}

/** iOS looks: same icon in default and dark, tinted, clear light. 112px tiles, rabbit 2/3 of the height. */
export function IosIconLooks() {
  const tile = 'flex size-28 items-center justify-center rounded-2xl';
  return (
    <div className="not-prose mb-6 grid grid-cols-2 gap-6 rounded-xl border border-site-border bg-background p-8 sm:grid-cols-4">
      <IconFigure title="Default" note="Sentinel">
        <div className={cn(tile, 'bg-teal-800 text-neutral-25')}>
          <RabbitMark className="h-2/3 w-auto" />
        </div>
      </IconFigure>
      <IconFigure title="Dark" note="Same as default">
        <div className="flex size-32 items-center justify-center rounded-2xl bg-neutral-900">
          <div className={cn(tile, 'bg-teal-800 text-neutral-25')}>
            <RabbitMark className="h-2/3 w-auto" />
          </div>
        </div>
      </IconFigure>
      <IconFigure title="Tinted" note="Near-white rabbit on transparent; iOS adds the tint">
        <div className="flex size-32 items-center justify-center rounded-2xl bg-neutral-900">
          <div className={cn(tile, 'border border-neutral-700 text-neutral-25')}>
            <RabbitMark className="h-2/3 w-auto" />
          </div>
        </div>
      </IconFigure>
      <IconFigure title="Clear light" note="Rabbit layer set to Forest">
        <div className={cn(tile, 'border border-neutral-200 bg-neutral-50 text-teal-800')}>
          <RabbitMark className="h-2/3 w-auto" />
        </div>
      </IconFigure>
    </div>
  );
}

/** Android: adaptive layers on a 108dp canvas (1px = 1dp here), launcher masks, themed and notification icons. */
export function AndroidIconLooks() {
  return (
    <div className="not-prose mb-6 grid grid-cols-2 gap-6 rounded-xl border border-site-border bg-background p-8 sm:grid-cols-4">
      <IconFigure title="Adaptive layers" note="108dp canvas · 66dp safe circle">
        <div className="relative flex size-27 items-center justify-center bg-teal-800 text-neutral-25">
          <span className="absolute size-16.5 rounded-full border border-dashed border-gold-300" aria-hidden="true" />
          <RabbitMark className="h-13 w-auto" />
        </div>
      </IconFigure>
      <IconFigure title="Launcher masks" note="The system crops the canvas">
        <div className="flex gap-2">
          <div className="flex size-14 items-center justify-center rounded-full bg-teal-800 text-neutral-25">
            <RabbitMark className="h-7 w-auto" />
          </div>
          <div className="flex size-14 items-center justify-center rounded-xl bg-teal-800 text-neutral-25">
            <RabbitMark className="h-7 w-auto" />
          </div>
        </div>
      </IconFigure>
      <IconFigure title="Themed (Android 13+)" note="Monochrome layer; the system picks the colors">
        <div className="flex size-16 items-center justify-center rounded-full bg-neutral-200 text-neutral-800">
          <RabbitMark className="h-8 w-auto" />
        </div>
      </IconFigure>
      <IconFigure title="Notification" note="Full rabbit, white on transparent, 96px">
        <div className="flex h-10 items-center gap-2 rounded-full bg-neutral-800 px-4 text-neutral-25">
          <RabbitMark className="h-5 w-auto" />
          <span className="text-ui-xs">9:41</span>
        </div>
      </IconFigure>
    </div>
  );
}

function Dont({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <figure>
      <div
        className={cn(
          'flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-site-border bg-background text-teal-800',
          className,
        )}
      >
        {children}
      </div>
      <figcaption className="mt-2 flex items-center gap-1.5 text-ui-xs text-site-fg">
        <X aria-label="Don't" className="size-3.5 shrink-0 text-site-muted" />
        {title}
      </figcaption>
    </figure>
  );
}

/** What never to do with the mark. */
export function LogoDonts() {
  return (
    <div className="not-prose mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Dont title="Stretch or squash">
        <RabbitMark className="h-16 w-24" preserveAspectRatio="none" />
      </Dont>
      <Dont title="Rotate">
        <RabbitMark className="h-16 w-auto rotate-45" />
      </Dont>
      <Dont title="Outline">
        <RabbitMark className="h-16 w-auto" fill="none" stroke="currentColor" strokeWidth={10} />
      </Dont>
      <Dont title="Crop or push off-centre">
        <RabbitMark className="h-full w-auto translate-x-6 translate-y-4 scale-110" />
      </Dont>
      <Dont title="Glow, blend or see-through" className="bg-teal-800 text-neutral-25">
        <RabbitMark className="h-16 w-auto opacity-50 drop-shadow-lg drop-shadow-green-300" />
      </Dont>
      <Dont title="Colors off the brand scales">
        <RabbitMark className="h-16 w-auto text-lime-500" />
      </Dont>
      <Dont title="Several rabbits for Matrix">
        <span className="flex gap-1">
          <RabbitMark className="h-10 w-auto" />
          <RabbitMark className="h-10 w-auto" />
          <RabbitMark className="h-10 w-auto" />
        </span>
      </Dont>
    </div>
  );
}
