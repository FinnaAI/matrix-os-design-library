import * as React from 'react';
import { cn } from '@/lib/utils';

// shadcn/ui Textarea, restyled to match Input: same border, fill, focus and error treatment.
// Grows with its content (field-sizing), starting at about three lines.

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-ui text-foreground shadow-xs',
        'transition-[border-color] duration-120 placeholder:text-muted-foreground',
        'enabled:hover:border-muted-foreground aria-invalid:border-destructive',
        'disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
