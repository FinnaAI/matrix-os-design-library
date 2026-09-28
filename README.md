# Matrix OS Design System

Foundations, components and guidelines for building **Matrix OS**: one system for the web shell, desktop app, mobile, macOS and built-in apps.

Built with Next.js, [Fumadocs](https://fumadocs.dev), Tailwind CSS v4 and shadcn/ui, the same stack as the Matrix OS product.

## Run it locally

Requirements: Node.js 20+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Where things live

| Path | What it is |
| --- | --- |
| `styles/tokens.css` | **The single source of truth.** Every color, radius, shadow and motion value. |
| `app/global.css` | Exposes the tokens as Tailwind utilities (`bg-primary`, `text-h1`, `rounded-lg`…). |
| `content/docs/library/`, `content/docs/guides/` | The Library (Start here, foundations, components) and Guides pages, written in MDX. |
| `styles/site.css`, `components/site/` | The neutral website frame: pill navigation, sidebar, page layout. |
| `components/ui/` | Matrix-styled shadcn components (coming next). |
| `components/brand/` | The Matrix OS rabbit mark. |
| `docs/plans/` | The build plan. |

## Source of truth

1. Figma brand file `xPG2FeYRtC9owCKSVXCqWA`, page "Styles"
2. [`DESIGN.md`](https://github.com/HamedMP/matrix-os/blob/main/DESIGN.md) in the Matrix OS repository
3. This repository, which turns both into working tokens and components

When sources disagree, fix the lower level. Never add another token set.

## Status

- [x] Site scaffold, Matrix branding and fonts (Bricolage Grotesque, Geist, Geist Mono)
- [x] Brand primitives and semantic tokens (light mode)
- [ ] Foundations pages
- [ ] Dark mode
- [ ] Components
- [ ] shadcn registry, so Matrix engineers can install components with one command
