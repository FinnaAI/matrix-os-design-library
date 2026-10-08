// Shared look for every floating list: Dropdown menu, Select, and later Context menu and Combobox.
// One card, one row, one label, one divider, so a menu and a select's options read as the same thing.
// Modelled on the menu: 32px rows (40px on touch), 14px text and icons, neutral hover.

/** The floating card: menus and popovers use the `lg` radius, overlays the `lg` shadow. */
export const menuSurface = [
  'z-50 min-w-45 overflow-x-hidden overflow-y-auto rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg',
  'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
  'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
  'data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2',
].join(' ');

/** One row. Highlight follows hover and keyboard (never a gold ring per row). Inner radius = 12 − 4 padding = 8. */
export const menuItem = [
  'relative flex h-8 w-full cursor-default items-center gap-1.5 rounded-md px-2 text-ui text-popover-foreground outline-hidden select-none',
  'pointer-coarse:h-10', // 40px on touch
  'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
  'data-disabled:pointer-events-none data-disabled:opacity-50',
  '[&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:icon-stroke-xs [&_svg]:shrink-0 [&_svg]:text-muted-foreground',
].join(' ');

/** Rows with a selected state show a check at the end; leave room for it. */
export const menuItemWithCheck = 'pr-7';

/** Where that check sits. */
export const menuCheck = 'pointer-events-none absolute right-2 flex size-3.5 items-center justify-center [&_svg]:text-foreground!';

/** A small heading above a group of rows. */
export const menuLabel = 'px-2 pt-2 pb-1 text-ui-xs font-medium text-muted-foreground';

/** A full-width divider between groups. */
export const menuSeparator = 'pointer-events-none -mx-1 my-1 h-px bg-border';

/** Rows without an icon, aligned with rows that have one (8px padding + 14px icon + 6px gap). */
export const menuInset = 'data-inset:pl-7';
