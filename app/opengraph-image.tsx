import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { resolveColor } from '@/lib/tokens';

// The link preview shown when the site is shared (Slack, WhatsApp, email, LinkedIn).
// Built once at build time from the real tokens, so it stays on-brand when colors change.
export const alt = 'Matrix OS Design System';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const TITLE = 'Matrix OS';
const SUBTITLE = 'Design System';

// Google Fonts serves a TTF (which ImageResponse needs) to non-browser clients. Subset to the text used.
async function googleFont(family: string, weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return src ? await (await fetch(src)).arrayBuffer() : null;
  } catch {
    return null; // Falls back to the default font rather than failing the build.
  }
}

export default async function OpengraphImage() {
  const ink = resolveColor('foreground');
  const muted = resolveColor('muted-foreground');
  const page = resolveColor('background');
  const swatches = ['green-500', 'neutral-800', 'coral-500', 'teal-500', 'gold-400', 'blue-500'].map(resolveColor);

  // The rabbit mark, drawn in the brand green.
  const mark = readFileSync(join(process.cwd(), 'public/brand/rabbit-mark.svg'), 'utf8').replace(
    /fill="#[0-9a-f]{6}"/i,
    `fill="${resolveColor('brand')}"`,
  );

  const [display] = await Promise.all([
    googleFont('Bricolage Grotesque', 700, TITLE + SUBTITLE),
  ]);
  const fonts = [
    display && { name: 'Bricolage', data: display, weight: 700 as const },
  ].filter((f) => f !== null && f !== undefined);

  // Everything sits in the centre square: Slack and others show the preview as a square
  // thumbnail and crop the sides, so the wide image only adds page color around it.
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
          background: page,
        }}
      >
        <img src={`data:image/svg+xml;base64,${Buffer.from(mark).toString('base64')}`} width={80} height={103} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Bricolage', fontSize: 64, fontWeight: 700, color: ink, lineHeight: 1, letterSpacing: -1.5 }}>
            {TITLE}
          </div>
          <div style={{ fontFamily: 'Bricolage', fontSize: 64, fontWeight: 700, color: muted, lineHeight: 1.1, letterSpacing: -1.5 }}>
            {SUBTITLE}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {swatches.map((color) => (
            <div key={color} style={{ width: 28, height: 28, borderRadius: 9999, background: color }} />
          ))}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
