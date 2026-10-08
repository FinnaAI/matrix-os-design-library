'use client';

import * as React from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Select as SelectPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';
import {
  menuCheck,
  menuItem,
  menuItemWithCheck,
  menuLabel,
  menuSeparator,
  menuSurface,
} from '@/components/ui/menu-styles';

// shadcn/ui Select, restyled with Matrix tokens:
// the trigger looks and sizes exactly like Input (sm 32 · md 36 · lg 40); the options share the
// Dropdown menu look, with a check at the end of the selected row. The list opens below the trigger
// and matches its width. Focus is the global gold ring; errors use aria-invalid.

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup(props: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue(props: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

const TRIGGER_SIZES = {
  sm: 'h-8 text-ui',
  md: 'h-9 text-ui',
  lg: 'h-10 text-ui-lg',
  // shadcn's name, kept so existing code keeps working.
  default: 'h-9 text-ui',
} as const;

function SelectTrigger({
  className,
  size = 'md',
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & { size?: keyof typeof TRIGGER_SIZES }) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        'flex w-full min-w-0 items-center justify-between gap-2 rounded-md border border-input bg-background px-3 text-left text-foreground whitespace-nowrap shadow-xs',
        'transition-[border-color] duration-120',
        'data-placeholder:text-muted-foreground',
        'enabled:hover:border-muted-foreground aria-invalid:border-destructive',
        'disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none',
        '*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5',
        '[&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:icon-stroke-xs [&>svg]:size-4 [&>svg]:stroke-2 [&_svg]:shrink-0 [&_svg]:text-muted-foreground',
        TRIGGER_SIZES[size],
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = 'popper',
  align = 'start',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          menuSurface,
          'relative max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) p-0',
          position === 'popper' && 'min-w-(--radix-select-trigger-width)',
          className,
        )}
        position={position}
        align={align}
        sideOffset={sideOffset}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className="scroll-my-1 p-1">{children}</SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return <SelectPrimitive.Label data-slot="select-label" className={cn(menuLabel, className)} {...props} />;
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        menuItem,
        menuItemWithCheck,
        '*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-1.5',
        className,
      )}
      {...props}
    >
      <span data-slot="select-item-indicator" className={menuCheck}>
        <SelectPrimitive.ItemIndicator>
          <Check />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator data-slot="select-separator" className={cn(menuSeparator, className)} {...props} />;
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn('flex cursor-default items-center justify-center py-1 text-muted-foreground', className)}
      {...props}
    >
      <ChevronUp className="size-3.5 icon-stroke-xs" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn('flex cursor-default items-center justify-center py-1 text-muted-foreground', className)}
      {...props}
    >
      <ChevronDown className="size-3.5 icon-stroke-xs" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
