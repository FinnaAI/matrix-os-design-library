'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';

// shadcn/ui Radio group, restyled with Matrix tokens and:
// outlined; selected darkens the ring and shows a dark dot. Sizes sm 16 (6px dot) · md 20 (8px dot).
// The group is one tab stop; arrow keys move and select. Focus is the global gold ring.

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn('grid gap-3', className)} {...props} />;
}

const radioVariants = cva(
  [
    'peer grid aspect-square shrink-0 place-content-center rounded-full border border-input bg-background shadow-xs',
    'transition-[border-color] duration-150 hover:border-muted-foreground',
    'data-[state=checked]:border-primary',
    'aria-invalid:border-destructive aria-invalid:data-[state=checked]:border-destructive',
    'disabled:data-[state=checked]:border-border disabled:data-[state=indeterminate]:border-border',
    'disabled:cursor-not-allowed disabled:border-border disabled:bg-muted disabled:shadow-none',
  ],
  {
    variants: {
      size: { sm: 'size-4', md: 'size-5' },
    },
    defaultVariants: { size: 'sm' },
  },
);

const DOT = { sm: 'size-1.5', md: 'size-2' } as const;

function RadioGroupItem({
  className,
  size: sizeProp,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & VariantProps<typeof radioVariants>) {
  const size = sizeProp ?? 'sm';
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      data-size={size}
      className={cn(radioVariants({ size }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className="grid place-content-center">
        <span className={cn('block rounded-full bg-primary in-disabled:bg-muted-foreground', DOT[size])} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem, radioVariants };
