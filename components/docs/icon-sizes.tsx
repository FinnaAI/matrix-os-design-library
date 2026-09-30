import { Mail } from 'lucide-react';
import { ICON_SIZES, Icon, iconStroke, type IconSize } from '@/components/ui/icon';
import { CopyCode } from './copy';

// The icon scale, read from components/ui/icon.tsx so the table can't drift from the component.
export function IconSizes() {
  return (
    <div className="not-prose mb-4 overflow-x-auto rounded-xl border border-site-border">
      <table className="w-full text-left text-body-sm">
        <thead>
          <tr className="border-b border-site-border">
            {['Size', 'Pixels', 'Example'].map((h) => (
              <th key={h} className="px-4 py-3 text-caption font-normal text-site-subtle">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-site-border">
          {(Object.keys(ICON_SIZES) as IconSize[]).map((size) => {
            const { paints, floored } = iconStroke(size);
            return (
              <tr key={size}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <CopyCode value={size === 'md' ? '<Icon />' : `<Icon size="${size}" />`} />
                </td>
                <td className="px-4 py-3 font-mono whitespace-nowrap text-site-muted">
                  {ICON_SIZES[size]}px · paints {Number.isInteger(paints) ? paints.toFixed(1) : +paints.toFixed(2)}
                  {floored && ' (floored)'}
                </td>
                <td className="px-4 py-3 text-site-fg">
                  <Icon icon={Mail} size={size} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
