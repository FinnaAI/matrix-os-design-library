import { isDark, resolveColor } from '@/lib/tokens';
import { ColorSwatch } from './color-swatch';

const STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

// A labeled row of 10 swatches for one scale, e.g. "Teal · brand anchor".
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
      <p className="mb-2 text-body-sm text-site-muted">{label}</p>
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
        {STEPS.map((step) => {
          const token = `${scale}-${step}`;
          return (
            <ColorSwatch
              key={token}
              token={token}
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

// Named brand values that sit outside the scales (ink, paper, sage).
export function ColorSet({ tokens }: { tokens: { token: string; name: string; note?: string }[] }) {
  return (
    <div className="not-prose mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {tokens.map(({ token, name, note }) => {
        const hex = resolveColor(token);
        return (
          <div key={token}>
            <ColorSwatch token={token} label={hex.toUpperCase()} hex={hex} dark={isDark(token)} className="h-20" />
            <p className="mt-2 text-body-sm font-medium text-site-fg">{name}</p>
            <p className="font-mono text-caption text-site-muted">--{token}</p>
            {note && <p className="mt-1 text-caption text-site-subtle">{note}</p>}
          </div>
        );
      })}
    </div>
  );
}
