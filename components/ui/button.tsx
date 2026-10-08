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
    'transition-[color,background-color,border-color,text-decoration-color] duration-150 select-none',
    'disabled:pointer-events-none disabled:opacity-50 aria-busy:pointer-events-none',
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
          'h-auto! px-0! text-destructive-text underline decoration-1 underline-offset-4 hover:text-destructive-hover',
        // shadcn's names, kept so existing product code keeps working: outline → secondary, default → primary.
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover',
        outline: 'border border-border bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary-hover',
      },
      // Height · label · padding. Padding tightens on the side that holds an icon.
      size: {
        xs: 'h-7 rounded-md px-2.5 text-ui-sm has-[>svg:first-child]:pl-2 has-[>svg:last-child]:pr-2 [&_svg]:size-3.5',
        sm: 'h-8 rounded-md px-3 text-ui has-[>svg:first-child]:pl-2.5 has-[>svg:last-child]:pr-2.5 [&_svg]:size-4',
        md: 'h-9 rounded-md px-3.5 text-ui has-[>svg:first-child]:pl-3 has-[>svg:last-child]:pr-3 [&_svg]:size-4',
        lg: 'h-10 rounded-md px-4 text-ui-lg has-[>svg:first-child]:pl-3.5 has-[>svg:last-child]:pr-3.5 [&_svg]:size-4',
        // shadcn's icon sizes, kept for existing code; prefer `square` with a size.
        icon: 'size-9 rounded-md [&_svg]:size-4',
        'icon-xs': 'size-7 rounded-md [&_svg]:size-3.5',
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
    /** Shows a spinner, keeps the button's width and blocks clicks. */
    loading?: boolean;
  };

function Button({
  className,
  variant = 'primary',
  size = 'md',
  square = false,
  round = false,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      aria-busy={loading || undefined}
      disabled={asChild ? undefined : disabled || loading}
      className={cn(buttonVariants({ variant, size, square, round }), className)}
      {...props}
    >
      {loading && !asChild ? (
        <>
          {/* The label stays in place (invisible) so the button keeps its width. */}
          <span className="invisible contents">{children}</span>
          <span className="absolute inset-0 flex items-center justify-center">
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
