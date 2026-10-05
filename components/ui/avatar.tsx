'use client';

// shadcn/ui Avatar (Radix), restyled with Matrix tokens and extended with what Matrix needs:
// four sizes, initials derived from a name, and an icon fallback. Avatar is for people; agents use the
// mascot, a separate component.
// Same parts and data-slot names as shadcn, so it drops into the product unchanged.

import * as React from 'react';
import { Avatar as AvatarPrimitive } from 'radix-ui';
import { User } from 'lucide-react';
import { Icon, type IconSize } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

export const AVATAR_SIZES = { xs: 20, sm: 24, md: 32, lg: 40 } as const;
const SIZE_CLASS = { xs: 'size-5', sm: 'size-6', md: 'size-8', lg: 'size-10' } as const;
export type AvatarSize = keyof typeof AVATAR_SIZES;

// The icon that fits inside each avatar size, from the Iconography scale.
const ICON_SIZE: Record<AvatarSize, IconSize> = { xs: 'xxs', sm: 'xs', md: 'sm', lg: 'md' };

// Initials are 40% of the avatar (8 · 10 · 13 · 16px): they scale with the circle, like the icon stroke.
const INITIALS_RATIO = 0.4;

const AvatarContext = React.createContext<{ size: AvatarSize; name?: string }>({ size: 'md' });

/** "Mary Jane Watson" → "MW". First and last word, at most two letters, safe for emoji and accents. */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  const first = Array.from(words[0])[0] ?? '';
  const last = words.length > 1 ? (Array.from(words[words.length - 1])[0] ?? '') : '';
  return (first + last).toLocaleUpperCase();
}

function Avatar({
  className,
  size = 'md',
  name,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  /** xs 20 · sm 24 · md 32 · lg 40 */
  size?: AvatarSize;
  /** The person's name: becomes the accessible label and the fallback initials. */
  name?: string;
}) {
  return (
    <AvatarContext.Provider value={{ size, name }}>
      <AvatarPrimitive.Root
        data-slot="avatar"
        data-size={size}
        role={name ? 'img' : undefined}
        aria-label={name}
        className={cn('group/avatar relative flex shrink-0 rounded-full select-none', SIZE_CLASS[size], className)}
        {...props}
      />
    </AvatarContext.Provider>
  );
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        // A hairline edge keeps light photos from melting into the page.
        'aspect-square size-full rounded-full object-cover outline outline-1 -outline-offset-1 outline-foreground/10',
        className,
      )}
      {...props}
    />
  );
}

/**
 * What shows when there's no image (or while it loads): initials from `name`, or explicit children,
 * or the person icon when there's nothing else.
 */
function AvatarFallback({
  className,
  children,
  style,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  const { size, name } = React.useContext(AvatarContext);
  const content = children ?? (name ? getInitials(name) : null);
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      style={{ fontSize: AVATAR_SIZES[size] * INITIALS_RATIO, ...style }}
      className={cn(
        'flex size-full items-center justify-center overflow-hidden rounded-full border border-tint-neutral-border bg-tint-neutral-fill leading-none font-medium tracking-tight text-tint-neutral-text',
        className,
      )}
      {...props}
    >
      {/* The root already announces the name, so the letters themselves stay silent. */}
      <span aria-hidden={name ? true : undefined} className="text-box-cap">
        {content || <Icon icon={User} size={ICON_SIZE[size]} />}
      </span>
    </AvatarPrimitive.Fallback>
  );
}

/** A small dot or icon circle on the bottom-right edge. Its size follows the avatar; you choose the color. */
function AvatarBadge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        'absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-success text-primary-foreground ring-2 ring-background select-none',
        'group-data-[size=xs]/avatar:size-1.5 group-data-[size=xs]/avatar:[&>svg]:hidden',
        'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden',
        'group-data-[size=md]/avatar:size-2.5 group-data-[size=md]/avatar:[&>svg]:size-2',
        'group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2',
        className,
      )}
      {...props}
    />
  );
}

/** Overlapping avatars. Give every child the same size; end with an AvatarGroupCount for the rest. */
function AvatarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="avatar-group"
      role="group"
      className={cn(
        'group/avatar-group flex -space-x-1.5 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background',
        className,
      )}
      {...props}
    />
  );
}

/** The "+N" chip at the end of a group, sized to match the avatars. */
function AvatarGroupCount({
  className,
  size = 'md',
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & { size?: AvatarSize }) {
  return (
    <div
      data-slot="avatar-group-count"
      style={{ fontSize: AVATAR_SIZES[size] * INITIALS_RATIO, ...style }}
      className={cn(
        SIZE_CLASS[size],
        'relative flex shrink-0 items-center justify-center rounded-full border border-tint-neutral-border bg-tint-neutral-fill leading-none font-medium tracking-tight text-tint-neutral-text ring-2 ring-background tabular-nums',
        className,
      )}
      {...props}
    >
      <span className="text-box-cap">{children}</span>
    </div>
  );
}

/** The placeholder circle while the person is still loading. */
function AvatarSkeleton({ className, size = 'md', ...props }: React.ComponentProps<'span'> & { size?: AvatarSize }) {
  return (
    <span
      data-slot="avatar-skeleton"
      aria-hidden="true"
      className={cn('block shrink-0 animate-pulse rounded-full bg-muted', SIZE_CLASS[size], className)}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount, AvatarSkeleton };
