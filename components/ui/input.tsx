import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// shadcn/ui Input, restyled with Matrix tokens and.
// Sizes line up with Button (sm 32 · md 36 · lg 40), so an input and a button of the same size sit level.
// lg uses 17px text: at 16px or more, iOS doesn't zoom into the field on focus.
// Focus is the global gold ring from styles/theme.css; errors use aria-invalid.

const inputVariants = cva(
  [
    'w-full min-w-0 rounded-md border border-input bg-background px-3 text-foreground shadow-xs',
    'transition-[border-color] duration-120',
    'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
    'file:mr-3 file:h-full file:border-0 file:bg-transparent file:font-medium file:text-foreground',
    'enabled:hover:border-muted-foreground aria-invalid:border-destructive',
    'disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 text-ui file:text-ui',
        md: 'h-9 text-ui file:text-ui',
        lg: 'h-10 text-ui-lg file:text-ui-lg',
        xl: 'h-11 text-ui-lg file:text-ui-lg', // 44px touch target
      },
    },
    defaultVariants: { size: 'md' },
  },
);

type InputProps = Omit<React.ComponentProps<'input'>, 'size'> & VariantProps<typeof inputVariants>;

function Input({ className, type, size: sizeProp, ...props }: InputProps) {
  const size = sizeProp ?? 'md';
  return (
    <input
      type={type}
      data-slot="input"
      data-size={size}
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants };
