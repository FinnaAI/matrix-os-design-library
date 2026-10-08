'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, Minus } from 'lucide-react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/icon';

// shadcn/ui Checkbox, restyled with Matrix tokens and:
// outlined, not filled. Checked and indeterminate darken the border and show a dark mark on the page color.
// Sizes sm 16 · md 20. Focus is the global gold ring; errors use aria-invalid.

const checkboxVariants = cva(
  [
    'peer group/checkbox grid shrink-0 place-content-center rounded-xs border border-input bg-background text-primary shadow-xs',
    'transition-[border-color] duration-120 hover:border-muted-foreground',
    'data-[state=checked]:border-primary data-[state=indeterminate]:border-primary',
    'aria-invalid:border-destructive aria-invalid:data-[state=checked]:border-destructive',
    'disabled:data-[state=checked]:border-border disabled:data-[state=indeterminate]:border-border',
    'disabled:cursor-not-allowed disabled:border-border disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none',
  ],
  {
    variants: {
      size: { sm: 'size-4', md: 'size-5' },
    },
    defaultVariants: { size: 'sm' },
  },
);

function Checkbox({
  className,
  size: sizeProp,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & VariantProps<typeof checkboxVariants>) {
  const size = sizeProp ?? 'sm';
  const iconSize = size === 'md' ? 'xs' : 'xxs';
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-size={size}
      className={cn(checkboxVariants({ size }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="grid place-content-center text-current">
        <Icon icon={Check} size={iconSize} className="group-data-[state=indeterminate]/checkbox:hidden" />
        <Icon icon={Minus} size={iconSize} className="hidden group-data-[state=indeterminate]/checkbox:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox, checkboxVariants };
