import type { ReactNode } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { menuCheck, menuItem, menuItemWithCheck, menuLabel, menuSeparator } from '@/components/ui/menu-styles';

// Static, always-open pictures of a menu or a select, built from the same classes as the real
// components (components/ui/menu-styles.ts), so the docs can show the open state at a glance.
// Not interactive; the live examples below them are.

const STATIC_SURFACE = 'w-56 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg';

export function MenuPreview({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div role="presentation" className={cn(STATIC_SURFACE, className)}>
      {children}
    </div>
  );
}

export function MenuPreviewItem({
  icon,
  children,
  shortcut,
  highlighted,
  checked,
  destructive,
  disabled,
}: {
  icon?: ReactNode;
  children: ReactNode;
  shortcut?: string;
  highlighted?: boolean;
  checked?: boolean;
  destructive?: boolean;
  disabled?: boolean;
}) {
  return (
    <div
      data-highlighted={highlighted || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        menuItem,
        checked !== undefined && menuItemWithCheck,
        destructive && 'text-destructive-text [&_svg]:text-destructive-text',
        destructive && highlighted && 'bg-tint-destructive-fill text-destructive-text',
      )}
    >
      {icon}
      <span className="truncate">{children}</span>
      {shortcut && <span className="ml-auto pl-4 text-ui-xs text-muted-foreground">{shortcut}</span>}
      {checked && (
        <span className={menuCheck}>
          <Check />
        </span>
      )}
    </div>
  );
}

export function MenuPreviewLabel({ children }: { children: ReactNode }) {
  return <div className={menuLabel}>{children}</div>;
}

export function MenuPreviewSeparator() {
  return <div className={menuSeparator} />;
}

/** A select's trigger with its list open below it. */
export function SelectPreview({ value, children }: { value: string; children: ReactNode }) {
  return (
    <div className="flex w-56 flex-col gap-1">
      <div className="flex h-9 items-center justify-between rounded-md border border-input bg-background px-3 text-ui text-foreground shadow-xs outline-2 outline-offset-2 outline-ring outline-solid">
        <span>{value}</span>
        <ChevronDown className="size-4 text-muted-foreground" />
      </div>
      <MenuPreview>{children}</MenuPreview>
    </div>
  );
}
