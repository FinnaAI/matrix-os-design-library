import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

// A static, always-visible tooltip bubble with the same look as TooltipContent, so the docs
// can show the open state without hovering. Not interactive.

// The arrow points at the trigger: a bubble shown above the trigger has its arrow on its bottom edge.
// Top/bottom arrows are 12×6, left/right arrows 6×12, drawn upright so they sit flush with the bubble.
const ARROW: Record<'top' | 'bottom' | 'left' | 'right', { className: string; width: number; height: number; viewBox: string; points: string }> = {
  top: { className: 'left-1/2 top-full -translate-x-1/2', width: 12, height: 6, viewBox: '0 0 30 10', points: '0,0 30,0 15,10' },
  bottom: { className: 'left-1/2 bottom-full -translate-x-1/2', width: 12, height: 6, viewBox: '0 0 30 10', points: '0,10 30,10 15,0' },
  left: { className: 'left-full top-1/2 -translate-y-1/2', width: 6, height: 12, viewBox: '0 0 10 30', points: '0,0 10,15 0,30' },
  right: { className: 'right-full top-1/2 -translate-y-1/2', width: 6, height: 12, viewBox: '0 0 10 30', points: '10,0 0,15 10,30' },
};

export function TooltipPreview({
  side = 'top',
  children,
  className,
}: {
  side?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      role="presentation"
      className={cn(
        'relative inline-block w-fit max-w-80 rounded-md bg-foreground px-3 py-1.5 text-left text-ui-xs font-medium text-background shadow-lg',
        className,
      )}
    >
      {children}
      <svg
        aria-hidden="true"
        width={ARROW[side].width}
        height={ARROW[side].height}
        viewBox={ARROW[side].viewBox}
        preserveAspectRatio="none"
        className={cn('absolute block fill-foreground', ARROW[side].className)}
      >
        <polygon points={ARROW[side].points} />
      </svg>
    </span>
  );
}
