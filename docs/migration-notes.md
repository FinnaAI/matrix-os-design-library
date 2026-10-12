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
