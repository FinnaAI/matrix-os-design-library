import { Icon as LucideNodeIcon, type IconNode, type LucideIcon, type LucideProps } from 'lucide-react';

// Matrix icons are Lucide, drawn on a 24×24 grid (her call, 2026-09-30: crisper than Hugeicons).
// Scale and stroke match the design system. The product currently uses 11–28px ad hoc;
// these five sizes replace them.
//
// Stroke rule: drawn at 2 on the 24 grid, so it scales with the icon (16px paints 1.33, 24px paints 2.0),
// and never painted thinner than 1.25px. Below 16px the stroke grows to hold that floor:
// strokeWidth = max(2, 1.25 × 24 / size).
export const ICON_SIZES = {
  xxs: 12,
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
} as const;

export type IconSize = keyof typeof ICON_SIZES;

const MIN_PAINT = 1.25;
const BASE_STROKE = 2;

/** The strokeWidth (in 24-grid units) for a size, what it paints on screen in px, and whether the floor applied. */
export function iconStroke(size: IconSize): { strokeWidth: number; paints: number; floored: boolean } {
  const px = ICON_SIZES[size];
  const floored = (BASE_STROKE * px) / 24 < MIN_PAINT;
  const strokeWidth = floored ? (MIN_PAINT * 24) / px : BASE_STROKE;
  return { strokeWidth, paints: (strokeWidth * px) / 24, floored };
}

export type IconProps = Omit<LucideProps, 'size' | 'strokeWidth' | 'absoluteStrokeWidth'> & {
  /** A Lucide icon component, e.g. `Mail` from `lucide-react`. */
  icon: LucideIcon;
  /** Defaults to md (20px). */
  size?: IconSize;
};

function a11y(ariaLabel: string | undefined) {
  return ariaLabel
    ? { 'aria-label': ariaLabel, role: 'img' as const }
    : { 'aria-hidden': true as const };
}

/**
 * One Lucide icon at a Matrix size. Color follows the text (`currentColor`), so set it with `text-*`.
 *
 * ```tsx
 * import { Mail } from 'lucide-react';
 * <Icon icon={Mail} />
 * ```
 *
 * Icons that only decorate are hidden from screen readers; pass `aria-label` for icon-only meaning.
 */
export function Icon({ icon: Glyph, size = 'md', 'aria-label': ariaLabel, ...props }: IconProps) {
  return (
    <Glyph
      size={ICON_SIZES[size]}
      strokeWidth={iconStroke(size).strokeWidth}
      {...a11y(ariaLabel)}
      {...props}
    />
  );
}

/** Same as Icon, but from raw drawing data. Used by the docs icon browser, which loads icons as data. */
export function IconFromNode({
  node,
  size = 'md',
  'aria-label': ariaLabel,
  ...props
}: Omit<IconProps, 'icon'> & { node: IconNode }) {
  return (
    <LucideNodeIcon
      iconNode={node}
      size={ICON_SIZES[size]}
      strokeWidth={iconStroke(size).strokeWidth}
      {...a11y(ariaLabel)}
      {...props}
    />
  );
}
