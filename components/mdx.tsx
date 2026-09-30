import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ColorRamp, ColorSet } from '@/components/docs/color-ramp';
import { SemanticRoles, TintTable } from '@/components/docs/token-tables';
import { Guideline, Guidelines, Related, RelatedCard } from '@/components/docs/guidelines';
import { CopyFormatToggle } from '@/components/docs/copy';
import { IconBrowser } from '@/components/docs/icon-browser';
import { IconSizes } from '@/components/docs/icon-sizes';
import { FocusRingOptions, InputBorderOptions } from '@/components/docs/decision-previews';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ColorRamp,
    ColorSet,
    CopyFormatToggle,
    IconBrowser,
    IconSizes,
    SemanticRoles,
    TintTable,
    FocusRingOptions,
    InputBorderOptions,
    Guidelines,
    Guideline,
    Related,
    RelatedCard,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
