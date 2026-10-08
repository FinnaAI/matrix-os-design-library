import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '@/lib/utils';

// shadcn/ui Badge, restyled with Matrix tokens and: a tinted label
// (light fill, matching edge, dark text) that reports status. Badges are informational, never buttons.
// Each variant is one of the tint sets on the Colors page, so every label stays above 6:1.

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-sm border px-1.5 font-medium whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        neutral: 'border-tint-neutral-border bg-tint-neutral-fill text-tint-neutral-text',
        success: 'border-tint-success-border bg-tint-success-fill text-tint-success-text',
        warning: 'border-tint-warning-border bg-tint-warning-fill text-tint-warning-text',
        destructive: 'border-tint-destructive-border bg-tint-destructive-fill text-tint-destructive-text',
        info: 'border-tint-info-border bg-tint-info-fill text-tint-info-text',
        brand: 'border-tint-brand-border bg-tint-brand-fill text-tint-brand-text',
        // shadcn's names, kept so existing product code renders the neutral badge until it moves to a status.
        default: 'border-tint-neutral-border bg-tint-neutral-fill text-tint-neutral-text',
        secondary: 'border-tint-neutral-border bg-tint-neutral-fill text-tint-neutral-text',
        outline: 'border-tint-neutral-border bg-tint-neutral-fill text-tint-neutral-text',
      },
      // Height · text: sm 22 · 12px, md 24 · 13px, lg 26 · 14px. Icons follow the text size.
      size: {
        sm: 'h-5.5 text-ui-xs [&_svg]:size-3',
        md: 'h-6 text-ui-sm [&_svg]:size-3',
        lg: 'h-6.5 text-ui [&_svg]:size-3.5',
      },
    },
    defaultVariants: { variant: 'neutral', size: 'md' },
  },
);

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

function Badge({
  className,
  variant: variantProp,
  size: sizeProp,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const variant = variantProp ?? 'neutral';
  const size = sizeProp ?? 'md';
  const Comp = asChild ? Slot.Root : 'span';
  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      className={cn('group/badge', badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

/** A status dot before the label, in the variant's solid status color. */
function BadgeDot({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="badge-dot"
      aria-hidden="true"
      className={cn(
        'size-1.5 shrink-0 rounded-full bg-muted-foreground',
        'group-data-[variant=success]/badge:bg-success group-data-[variant=warning]/badge:bg-warning',
        'group-data-[variant=destructive]/badge:bg-destructive group-data-[variant=info]/badge:bg-info',
        'group-data-[variant=brand]/badge:bg-brand',
        className,
      )}
      {...props}
    />
  );
}

export { Badge, BadgeDot, badgeVariants };
