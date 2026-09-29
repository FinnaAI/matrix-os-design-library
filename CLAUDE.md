# Matrix OS Design System

Documentation site and component library for Matrix OS. The owner is a UX/UI designer, not a developer: explain decisions in plain language and pause on structural choices.

## Stack

- Next.js 16 (App Router) + Fumadocs (MDX docs) + Tailwind CSS v4 + shadcn/ui (new-york, Radix)
- pnpm, TypeScript, React 19
- Commands: `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm types:check`

## Source of truth

1. Figma **Style library** `SiIcS4zeWkvC5R3pfanUgL` ("Style Sheet — Color", node `1:9`): brand colors, roles, scales (25–900)
2. Figma brand file `xPG2FeYRtC9owCKSVXCqWA` and Matrix OS `DESIGN.md`: type scale, spacing, radius, principles (their color *roles* are superseded by the Style library)
3. `styles/tokens.css` in this repo

Brand color roles: **Green `--green-500`** primary brand tone (identity, not actions) · **Coral `--coral-500`** warm action/CTA (`--primary`) · **Teal `--teal-500`** success · **Gold `--gold-400`** highlight. Blue = information; Neutral = structure and text.

Never invent brand values. If something is missing from Figma and DESIGN.md, mark it `PROVISIONAL` in `tokens.css` and flag it to the user.

## Rules

- **Every color is a step of a brand scale.** No off-scale values (the old ink/paper/sage/canvas are gone).
- **Tokens only.** No hex, rgb or arbitrary Tailwind values (`w-[13px]`, `text-[11px]`) in components or pages. Use semantic utilities (`bg-primary`, `text-muted-foreground`, `border-border`) and the type scale (`text-h1`, `text-body`, `text-caption`, `text-label`).
- **Semantic before primitive.** Prefer `bg-primary` over `bg-teal-800`. Use brand scales only for illustrations, swatches and documentation.
- **shadcn naming.** Semantic tokens use shadcn names so components drop into the Matrix product unchanged. Note that shadcn `accent` is a hover surface (`--teal-50`); gold highlight is `attention`; brand identity is `brand`.
- **Fonts:** Bricolage Grotesque for headings (`font-heading`), Geist for UI and body (`font-sans`), Geist Mono for code and machine text (`font-mono`).
- **Focus** is always the Gold ring (`--ring`) with an offset. Never remove focus without replacing it.
- **Minimum sizes:** body text 14px or more, touch targets 44px or more.
- **One component per concept.** Add components with `pnpm dlx shadcn@latest add <name>`, then restyle with tokens. Never create a second Button.
- **Light mode only** until dark tokens are designed. Don't add `dark:` variants yet.
- Wordmark is "Matrix OS", never "MatrixOS".

## Docs content

- Pages live in `content/docs/library/**` (Start here, foundations, components) and `content/docs/guides/**`. Navigation order lives in each folder's `meta.json`.
- **Site chrome is neutral white/gray** (`styles/site.css`, `bg-site-*`/`text-site-*` utilities) so components stand out. Site chrome never uses Matrix brand colors; Matrix components never use `site-*` tokens.
- The site layout is custom and Matrix-style: floating pill nav (`components/site/site-nav.tsx`), plain sidebar (`components/site/library-sidebar.tsx`), page body (`components/site/doc-page.tsx`). Fumadocs is used only for content loading and MDX blocks.
- Site headings use Geist. Matrix components opt into Bricolage with `font-heading`.
- Each component page follows: overview → live example → variants → states → usage do/don't → accessibility → code.
