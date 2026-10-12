# Migrating the Matrix product: notes

Working notes for the future **"Migrating the product" guide** (Guides) and the per-component agent `.md` files.
Not shown on the site. Each entry: what the product does today → what to use instead.
Findings come from reading the matrix-os repo (shell, packages/ui) on the dates noted.

## Setup (all components)

- Product theme: shadcn tokens with the legacy forest/ember colors in `shell/src/app/globals.css`.
  Replace with `styles/tokens.css` + `styles/theme.css` (see Start here). Remove the old `:root` color
  variables and `@theme` block so two sets don't fight over `--primary`.
- `cn()` uses clsx + tailwind-merge. Extend tailwind-merge with the Matrix class names (Start here, step 3),
  or `text-ui` etc. get dropped next to a text color.

## Badge (2026-10-05)

- Today: `<Badge variant="outline" className={…}>` with status colors coded by hand per screen
  (`SEVERITY_STYLES.*.badge`, `severityBadgeStyle()`, `tone(run.status)`, `bg-forest/10 text-forest` for "ready").
  Files: `shell/src/components/settings/**` (ChannelCard, SkillsSection, CronSection, SystemSection,
  PluginsSection, AgentRuntimePanel, HermesConfigurationDialog…), `home/apps/symphony/src/App.tsx`.
- Instead: pick a status variant and drop the className.

  ```tsx
  // Before
  <Badge variant="outline" className={SEVERITY_STYLES.warning.badge}>Warning</Badge>
  // After
  <Badge variant="warning">Warning</Badge>
  ```

- Mapping: critical/error/failed → `destructive` · warning → `warning` · info → `info` ·
  ready/connected/success → `success` · everything else → `neutral`.
- `default`, `secondary` and `outline` keep working (neutral) so screens can move one at a time.
- Also replace ad-hoc sizes like `text-[11px]` / `text-xs` on badges with the `size` prop.

## Avatar (2026-10-05)

- Today: avatars in `UserButton`, taskbar, account menus are built ad hoc.
- Instead: `<Avatar name={user.name}><AvatarImage src={user.photo} alt="" /><AvatarFallback /></Avatar>`.
- Agents are **not** avatars: they use the mascot (`RecipeRabbit` today), a separate component to come.

## Icons (2026-09-30)

- Today: Hugeicons via `shell/src/lib/hugeicons.tsx`, sizes 11–28px ad hoc, stroke 1.5.
- Instead: Lucide through `components/ui/icon.tsx` with the five sizes; `lib/matrix-icons.ts` maps the
  product's current icons to Lucide names. Needs the team's agreement (they had picked Hugeicons).

## Input (2026-10-08)

- Today: 6 files use the shadcn `Input`; about 85 hand-made `<input>` elements across shell and desktop.
  Icons inside fields are faked with padding (`className="pl-9"` plus an absolutely positioned icon).
- Instead: `<Input>` for plain fields; `<InputGroup>` + `<InputGroupAddon>` for icons, prefixes,
  shortcuts and inline buttons.

  ```tsx
  // Before
  <div className="relative"><Search className="absolute left-3 …" /><Input className="pl-9" … /></div>
  // After
  <InputGroup>
    <InputGroupAddon><Search /></InputGroupAddon>
    <InputGroupInput placeholder="Search providers and credentials…" />
  </InputGroup>
  ```

- Sizes: shadcn's default `h-9` = Matrix `md`. Use `size="lg"` on mobile.

## Logo and app icons (2026-10-12)

Read from matrix-os `apps/mobile/assets/` (repo state 2026-09-28), `shell/src/app/` and `macos/Resources/`.

- iOS `app.icon/icon.json`: the rabbit layer is scaled **1.07** with an offset of **(-11.8, -49.4)**, so it runs into the edge and the mask crops it. → Scale 1, offset 0, rabbit about 66% of the tile height, centred.
- iOS `app.icon`: a light gradient background, `darken`/`multiply` blend modes, `blur-material: 0.5` and an off-scale fill (`display-p3:0.340,0.370,0.322` ≈ `#434E3F`). → Solid teal-800 background, neutral-25 rabbit, no blend or translucency. Tinted: near-white rabbit on transparent (today a mid-grey PNG, `ios-tinted.png`). Clear light: rabbit layer teal-800.
- `app.icon/Assets/rabbit.svg` has a **503 × 660** viewBox; the canonical mark is **510 × 660** and its paths reach x ≈ 506, so the right edge is clipped by about 3 units. The paths are the same, so it isn't skewed. → Replace with the 510 × 660 file from the design system (`public/brand/rabbit-mark-white.svg`).
- Android `app.json`: `adaptiveIcon.backgroundColor` is `#EEEEE2` (off-scale) and there is no `monochromeImage`. → `#0E3422` (teal-800), add a monochrome rabbit layer, keep the rabbit inside the 66dp safe circle.
- Splash: `backgroundColor` `#FAFAF9` (off-scale) with no dark variant. → Light: teal-800 rabbit on `#FAFAFA` (neutral-25); dark: neutral-25 rabbit on `#0E3422`.
- Web `shell/src/app/icon.png` (512) and `apple-icon.png` (180): an olive tile with a cream rabbit that runs off the bottom-left. → Sentinel tile, rabbit centred (PROVISIONAL spec on the Logo page).
- Mac `macos/Resources/AppIcon.icns`: glossy bevel, gradient and glass highlights on the rabbit. → Flat Sentinel (PROVISIONAL spec on the Logo page).
