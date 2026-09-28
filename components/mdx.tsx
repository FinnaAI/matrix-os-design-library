import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ColorRamp, ColorSet } from '@/components/docs/color-ramp';
import { SemanticRoles, TintTable } from '@/components/docs/token-tables';
import { Guideline, Guidelines, Related, RelatedCard } from '@/components/docs/guidelines';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ColorRamp,
    ColorSet,
    SemanticRoles,
    TintTable,
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
