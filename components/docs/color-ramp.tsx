import { isDark, resolveColor, tailwindUtility } from '@/lib/tokens';
import { cn } from '@/lib/utils';
import { ColorSwatch } from './color-swatch';

const STEPS = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

// A labeled row of 11 swatches (25–900) for one scale, e.g. "Teal · brand anchor".
export function ColorRamp({
  scale,
  label,
  brandStep,
}: {
  scale: string;
  label: string;
  brandStep?: string;
}) {
  return (
    <div className="not-prose mb-6">
      <p className="mb-2 text-ui text-site-muted">{label}</p>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-11">
        {STEPS.map((step) => {
          const token = `${scale}-${step}`;
          return (
            <ColorSwatch
              key={token}
              token={token}
              utility={tailwindUtility(token)}
              label={step}
              hex={resolveColor(token)}
              dark={isDark(token)}
              brand={step === brandStep}
            />
          );
        })}
      </div>
    </div>
  );
}

// Named colors shown as larger tiles with their token and Tailwind class (brand colors, surfaces).
export function ColorSet({ tokens }: { tokens: { token: string; name: string; note?: string }[] }) {
  return (
    <div
      className={cn(
        'not-prose mb-6 grid grid-cols-2 gap-4',
        tokens.length % 3 === 0 ? 'sm:grid-cols-3' : 'sm:grid-cols-4',
      )}
    >
      {tokens.map(({ token, name, note }) => {
        const hex = resolveColor(token);
        return (
          <div key={token}>
            <ColorSwatch
              token={token}
              utility={tailwindUtility(token)}
              label={hex.toUpperCase()}
              hex={hex}
              dark={isDark(token)}
              className="h-20"
            />
            <p className="mt-2 text-ui font-medium text-site-fg">{name}</p>
            <p className="font-mono text-ui-xs text-site-muted">--{token}</p>
            <p className="font-mono text-ui-xs text-site-muted">{tailwindUtility(token)}</p>
            {note && <p className="mt-1 text-ui-xs text-site-subtle">{note}</p>}
          </div>
        );
      })}
    </div>
  );
}
