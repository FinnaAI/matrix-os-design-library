# Matrix OS Design System

Documentation site and component library for Matrix OS. The owner is a UX/UI designer, not a developer: explain decisions in plain language and pause on structural choices.

## Stack

- Next.js 16 (App Router) + Fumadocs (MDX docs) + Tailwind CSS v4 + shadcn/ui (new-york, Radix)
- pnpm, TypeScript, React 19
- Commands: `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm types:check`

## Source of truth

**This design system is the source of truth** (her call, 2026-09-30): `styles/tokens.css` in this repo (all values) + `styles/theme.css` (the Matrix `@theme` mapping to Tailwind and base focus styles). These two files, `lib/utils.ts` and `components/ui/icon.tsx` are what apps copy; keep them free of docs-site code. Site chrome lives in `app/global.css` and `styles/site.css`.

References, not sources of truth (update them to match this repo, never the other way):
- Figma **Style library** `SiIcS4zeWkvC5R3pfanUgL` and brand file `xPG2FeYRtC9owCKSVXCqWA`: where the brand scales came from
- Matrix OS `DESIGN.md`: principles, radius and the brand type scale

Brand color roles: **Green `--green-500`** primary brand tone (identity, not actions) · **Neutral `--neutral-800`** actions/CTA (`--primary`) · **Coral `--coral-500`** destructive/error (`--destructive`; her call 2026-09-30) · **Teal `--teal-500`** success · **Gold `--gold-400`** highlight. Links use `--link` (neutral-800), always underlined. Blue = information only; Neutral = structure, text and actions.

Never invent brand values. If something isn't decided yet, mark it `PROVISIONAL` in `tokens.css` and ask the user; don't fill the gap from Figma or DESIGN.md without her confirmation.

## Rules

- **Every color is a step of a brand scale.** No off-scale values (the old ink/paper/sage/canvas are gone).
- **Tokens only.** No hex, rgb or arbitrary Tailwind values (`w-[13px]`, `text-[11px]`) in components or pages. Use semantic utilities (`bg-primary`, `text-muted-foreground`, `border-border`) and the type scale: product `text-ui-lg/ui/ui-sm/ui-xs/ui-cap`, `text-heading(-sm)`, `text-metric(-sm)`; brand `text-brand-*` with `font-heading`, for brand moments only.
- **Semantic before primitive.** Prefer `bg-primary` over `bg-teal-800`. Use brand scales only for illustrations, swatches and documentation.
- **shadcn naming.** Semantic tokens use shadcn names so components drop into the Matrix product unchanged. Note that shadcn `accent` is a hover surface (`--coral-25`, kept lighter than the coral-50 error tint); gold highlight is `attention`; brand identity is `brand`.
- **Fonts:** Geist for all product UI including headings (semibold), Geist Mono for machine text (`font-mono`), Bricolage Grotesque (`font-heading`) only for brand moments (onboarding, empty states, marketing). Weights 400/500/600; no bold in product.
- **Merging classes:** always use `cn` from `lib/utils.ts`; it registers the custom Matrix class names so tailwind-merge doesn't drop them. Add any new custom size/shadow/radius name there.
- **Icons:** Lucide (`lucide-react`, shadcn's default; her call 2026-09-30, Hugeicons felt too soft), always rendered through `components/ui/icon.tsx` with a scale size matching (`xxs` 12 · `xs` 14 · `sm` 16 · `md` 20 default · `lg` 24; stroke 2 on the 24 grid, floored at 1.25px). Never pass a pixel size or `strokeWidth`; never mix in Hugeicons or emoji.
- **Elevation:** shadows only from tokens: `--elevation-{xs,sm,md,lg,xl,2xl,3xl,xs-top}` in `tokens.css` = Tailwind `shadow-*`. Resting controls `xs`, overlays `lg`, dialogs `xl`. Never hand-write a `box-shadow`. (Source tokens are named `--elevation-*` because `@theme` can't map `--shadow-lg` to itself.)
- **Radius:** `--rounded-{2xs 2,xs 4,sm 6,md 8,lg 12 default,xl 16,2xl 24,full}` in `tokens.css` = Tailwind `rounded-*`; `--radius` (shadcn) = `--rounded-lg`. Pick the radius by the container's size (see the Radius page's size table); nested corners: inner = outer − padding.
- **Spacing:** only the scale 0·2·4·6·8·12·16·20·24·32·40·48·56·64·96px (`--space-*` in `tokens.css`; Tailwind numeric classes, p-2 = 8px). Default 8px inside a component, 16px between components. No off-scale steps (`p-2.5`, `gap-7`, `p-[13px]`). Borders 1px; 2px only for focus/active/selected.
- **Focus** is always the Gold ring (`--ring`) with an offset. Never remove focus without replacing it.
- **Minimum sizes:** body text 14px or more, touch targets 44px or more.
- **One component per concept.** Add components with `pnpm dlx shadcn@latest add <name>`, then restyle with tokens. Never create a second Button.
- **Light mode only** until dark tokens are designed. Don't add `dark:` variants yet.
- Wordmark is "Matrix OS", never "MatrixOS".

## Docs content

- **Developer-ready, always.** Every foundation and component page must be usable by developers as-is: real token names **and** Tailwind classes, copy-paste code that works, copyable values, and any setup a developer needs (token CSS, `@theme`, fonts, `cn`). Designers and developers read the same page.

- Pages live in `content/docs/library/**` (Start here, foundations, components) and `content/docs/guides/**`. Navigation order lives in each folder's `meta.json`.
- **Site chrome is neutral white/gray** (`styles/site.css`, `bg-site-*`/`text-site-*` utilities) so components stand out. Site chrome never uses Matrix brand colors; Matrix components never use `site-*` tokens.
- The site layout is custom and Matrix-style: floating pill nav (`components/site/site-nav.tsx`), plain sidebar (`components/site/library-sidebar.tsx`), page body (`components/site/doc-page.tsx`). Fumadocs is used only for content loading and MDX blocks.
- Site text uses the product scale (`text-ui`, `text-ui-xs`); page titles use the site-only `text-site-title`.
- Each component page follows: overview → live example → variants → states → usage do/don't → accessibility → code.
- **Adding a shadcn component:** `pnpm dlx shadcn@latest add <name>`, then (1) change its `cn` import from `"cn"` to `@/lib/utils` (the raw package drops Matrix class names), (2) restyle with Matrix tokens only, (3) keep shadcn's part names and `data-slot`s so it drops into the product unchanged. Document it with `<Example title code>` blocks (preview + Show code) and a `<PropsTable>`, modelled on the.
- **Component pages describe the component, not the migration.** Product-specific "before → after" notes go in `docs/migration-notes.md` (source for the future migration guide and agent `.md` files), never on the component page.
- **Agents vs people:** Avatar is for people only. Agents are shown with the mascot (Matrix rabbit art), which will be its own component; don't add an agent variant to Avatar.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
