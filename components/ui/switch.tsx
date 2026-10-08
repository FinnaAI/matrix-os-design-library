'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Switch as SwitchPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';

// shadcn/ui Switch, restyled with Matrix tokens and:
// dark neutral track when on, the input border color when off, a near-white thumb.
// Sizes sm 28×16 · md 36×20 (default). Screen readers announce on/off (role="switch").
// The thumb's slide is the one animation that carries meaning, so it stays.

const switchVariants = cva(
  [
    'peer group/switch inline-flex shrink-0 items-center rounded-full p-0.5 transition-colors duration-150',
    'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
    'aria-invalid:ring-2 aria-invalid:ring-destructive',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-7',
        md: 'h-5 w-9',
        // shadcn's name, kept so existing code keeps working.
        default: 'h-5 w-9',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

const THUMB = {
  sm: 'size-3 data-[state=checked]:translate-x-3',
  md: 'size-4 data-[state=checked]:translate-x-4',
  default: 'size-4 data-[state=checked]:translate-x-4',
} as const;

function Switch({
  className,
  size = 'md',
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & VariantProps<typeof switchVariants>) {
  const s = size ?? 'md';
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={s}
      className={cn(switchVariants({ size: s }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block rounded-full bg-background shadow-xs transition-transform duration-150 data-[state=unchecked]:translate-x-0',
          THUMB[s],
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch, switchVariants };
