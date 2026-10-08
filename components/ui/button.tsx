import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { Slot } from 'radix-ui';
import { cn } from '@/lib/utils';

// shadcn/ui Button, restyled with Matrix tokens and.
// Primary is neutral (actions), destructive is coral (danger), links are neutral and underlined.
// Sizes follow (28 · 32 · 36 · 40px); corners follow the radius-by-size table
// (every size 8px, so the sizes read as one family). Focus is the global gold ring from styles/theme.css.

const buttonVariants = cva(
  [
    'relative inline-flex shrink-0 items-center justify-center gap-1.5 font-medium whitespace-nowrap',
    'transition-[color,background-color,border-color,text-decoration-color] duration-120 select-none',
    'disabled:pointer-events-none disabled:opacity-50 aria-busy:pointer-events-none aria-disabled:pointer-events-none aria-disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover',
        secondary: 'border border-border bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary-hover',
        ghost: 'text-foreground hover:bg-ghost-hover',
        destructive: 'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive-hover',
        'ghost-destructive': 'text-destructive-text hover:bg-tint-destructive-fill',
        link: 'h-auto! px-0! text-link underline decoration-1 underline-offset-4 hover:text-link-hover',
        'link-destructive':
          'h-auto! px-0! text-destructive-text underline decoration-1 underline-offset-4 hover:text-destructive-text-hover',
        // shadcn's names, kept so existing product code keeps working: outline → secondary, default → primary.
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover',
        outline: 'border border-border bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary-hover',
      },
      // Height · label · padding. Padding tightens on the side that holds an icon.
      size: {
        xs: 'h-7 rounded-md px-2.5 text-ui-sm has-[>svg:first-child]:pl-2 has-[>svg:last-child]:pr-2 [&_svg]:size-3.5 [&_svg]:icon-stroke-xs',
        sm: 'h-8 rounded-md px-3 text-ui has-[>svg:first-child]:pl-2.5 has-[>svg:last-child]:pr-2.5 [&_svg]:size-4',
        md: 'h-9 rounded-md px-3.5 text-ui has-[>svg:first-child]:pl-3 has-[>svg:last-child]:pr-3 [&_svg]:size-4',
        lg: 'h-10 rounded-md px-4 text-ui-lg has-[>svg:first-child]:pl-3.5 has-[>svg:last-child]:pr-3.5 [&_svg]:size-4',
        // shadcn's icon sizes, kept for existing code; prefer `square` with a size.
        icon: 'size-9 rounded-md [&_svg]:size-4',
        'icon-xs': 'size-7 rounded-md [&_svg]:size-3.5 [&_svg]:icon-stroke-xs',
        'icon-sm': 'size-8 rounded-md [&_svg]:size-4',
        'icon-lg': 'size-10 rounded-md [&_svg]:size-4',
        default: 'h-9 rounded-md px-3.5 text-ui has-[>svg:first-child]:pl-3 has-[>svg:last-child]:pr-3 [&_svg]:size-4',
      },
      /** Icon-only: width equals height. Always add an aria-label. */
      square: { true: 'px-0! aspect-square' },
      /** Fully circular: send buttons, floating actions. */
      round: { true: 'rounded-full' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** Shows a spinner, keeps the button's width, label and focus, and blocks clicks. */
    loading?: boolean;
  };

function Button({
  className,
  variant,
  size,
  square = false,
  round = false,
  asChild = false,
  loading = false,
  disabled,
  type,
  tabIndex,
  onClick,
  children,
  ...props
}: ButtonProps) {
  // `?? ` (not default params) so an explicit null from a wrapper still gets the default look.
  const v = variant ?? 'primary';
  const s = size ?? 'md';
  const Comp = asChild ? Slot.Root : 'button';
  // asChild renders your element (e.g. a link), which has no native `disabled`: fake it accessibly.
  const fakeDisabled = asChild && !!disabled;
  const blocked = loading || fakeDisabled;

  return (
    <Comp
      data-slot="button"
      data-variant={v}
      data-size={s}
      // A plain button defaults to type="button" so it never submits a form by accident.
      type={asChild ? type : (type ?? 'button')}
      aria-busy={loading || undefined}
      aria-disabled={fakeDisabled || undefined}
      tabIndex={fakeDisabled ? -1 : tabIndex}
      // Loading keeps the button enabled so keyboard focus stays on it, except a submit button,
      // which is disabled so a form can't be sent twice while it's saving.
      disabled={asChild ? undefined : disabled || (loading && type === 'submit') || undefined}
      // Mouse clicks are blocked by CSS (aria-busy / aria-disabled); this also blocks Enter and Space.
      onClick={
        onClick &&
        ((event: React.MouseEvent<HTMLButtonElement>) => {
          if (blocked) {
            event.preventDefault();
            return;
          }
          onClick(event);
        })
      }
      className={cn(buttonVariants({ variant: v, size: s, square, round }), className)}
      {...props}
    >
      {loading && !asChild ? (
        <>
          {/* The label stays in place, transparent, so the width holds and screen readers still read it. */}
          <span className="contents text-transparent [&_svg]:opacity-0">{children}</span>
          <span className="absolute inset-0 flex items-center justify-center text-current">
            <Loader2 className="animate-spin" aria-hidden="true" />
          </span>
        </>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
