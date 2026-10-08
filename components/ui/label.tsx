'use client';

import * as React from 'react';
import { Label as LabelPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';

// shadcn/ui Label, restyled with Matrix tokens: 14px medium, neutral. Softens when its control is disabled.

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-ui font-medium text-foreground select-none',
        'peer-disabled:cursor-not-allowed peer-disabled:text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}

export { Label };
