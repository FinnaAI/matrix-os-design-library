'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// shadcn/ui Input group, restyled with Matrix tokens: an input (or textarea) with icons, text,
// keyboard hints or small buttons inside the same field. The group owns the border, fill, size and
// focus ring; the control inside is borderless.

const SIZES = { sm: 'h-8', md: 'h-9', lg: 'h-10' } as const;

// The focus ring sits on the group, not on the inner control, so it wraps the icons and buttons too.
const CONTROL_FOCUSED = 'has-[[data-slot=input-group-control]:focus-visible]';

function InputGroup({
  className,
  size = 'md',
  ...props
}: React.ComponentProps<'div'> & { size?: keyof typeof SIZES }) {
  return (
    <div
      data-slot="input-group"
      data-size={size}
      role="group"
      className={cn(
        'group/input-group relative flex w-full min-w-0 items-center rounded-md border border-input bg-background shadow-xs',
        'transition-[border-color] duration-150',
        SIZES[size],
        'has-[>textarea]:h-auto',

        // Spacing next to an addon.
        'has-[>[data-align=inline-start]]:[&>input]:pl-2',
        'has-[>[data-align=inline-end]]:[&>input]:pr-2',
        'has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3',
        'has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3',

        // Focus: the global gold ring, drawn around the whole group.
        `${CONTROL_FOCUSED}:outline-2 ${CONTROL_FOCUSED}:outline-offset-2 ${CONTROL_FOCUSED}:outline-ring ${CONTROL_FOCUSED}:outline-solid`,

        // Error and disabled.
        'has-[[data-slot=input-group-control][aria-invalid=true]]:border-destructive',
        'has-[[data-slot=input-group-control]:disabled]:bg-muted has-[[data-slot=input-group-control]:disabled]:shadow-none',

        className,
      )}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  [
    'flex h-auto cursor-text items-center justify-center gap-2 text-ui text-muted-foreground select-none',
    'group-has-[:disabled]/input-group:opacity-50',
    '[&>svg]:size-4 [&>svg]:shrink-0',
    '[&>kbd]:rounded-xs [&>kbd]:bg-muted [&>kbd]:px-1 [&>kbd]:font-sans [&>kbd]:text-ui-xs',
  ],
  {
    variants: {
      align: {
        'inline-start': 'order-first pl-3 has-[>button]:-ml-1.5 has-[>kbd]:-ml-1',
        'inline-end': 'order-last pr-3 has-[>button]:-mr-1.5 has-[>kbd]:-mr-1',
        'block-start': 'order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2',
        'block-end': 'order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2',
      },
    },
    defaultVariants: { align: 'inline-start' },
  },
);

function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        // Clicking the addon (but not a button in it) focuses the field.
        if ((e.target as HTMLElement).closest('button')) return;
        e.currentTarget.parentElement?.querySelector<HTMLElement>('input, textarea')?.focus();
      }}
      {...props}
    />
  );
}

// Small buttons that live inside the field: 24px, so they fit the 32–40px group with even padding.
const GROUP_BUTTON_SIZES = {
  xs: { size: 'xs', square: false, className: 'h-6 rounded-xs px-2' },
  'icon-xs': { size: 'xs', square: true, className: 'h-6 rounded-xs' },
} as const;

function InputGroupButton({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'xs',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'size' | 'square'> & {
  size?: keyof typeof GROUP_BUTTON_SIZES;
}) {
  const preset = GROUP_BUTTON_SIZES[size];
  return (
    <Button
      type={type}
      variant={variant}
      size={preset.size}
      square={preset.square}
      data-size={size}
      className={cn('shadow-none', preset.className, className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'flex items-center gap-2 text-ui text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-4',
        className,
      )}
      {...props}
    />
  );
}

// The inner control is borderless; the group draws the edge and the focus ring.
const GROUP_CONTROL =
  'flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:outline-none disabled:bg-transparent';

function InputGroupInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(GROUP_CONTROL, 'h-full group-data-[size=lg]/input-group:text-ui-lg', className)}
      {...props}
    />
  );
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(GROUP_CONTROL, 'resize-none py-3', className)}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
