import defaultMdxComponents from 'fumadocs-ui/mdx';
import { TypeTable as PropsTable } from 'fumadocs-ui/components/type-table';
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  AvatarSkeleton,
} from '@/components/ui/avatar';
import { Badge, BadgeDot } from '@/components/ui/badge';
import { Example, ExampleLabel } from '@/components/docs/example';
import type { MDXComponents } from 'mdx/types';
import { ColorRamp, ColorSet } from '@/components/docs/color-ramp';
import { SemanticRoles, TintTable } from '@/components/docs/token-tables';
import { Guideline, Guidelines, Related, RelatedCard } from '@/components/docs/guidelines';
import { CopyFormatToggle } from '@/components/docs/copy';
import { IconBrowser } from '@/components/docs/icon-browser';
import { IconSizes } from '@/components/docs/icon-sizes';
import { ShadowScale } from '@/components/docs/shadow-scale';
import { FontSpecimens, TabularNumbers, TypeTable } from '@/components/docs/type-scale';
import { BorderWidthScale, SpaceScale, SpacingInContext } from '@/components/docs/space-scale';
import { NestedRadius, RadiusBySize, RadiusScale } from '@/components/docs/radius-scale';
import { FocusRingOptions, InputBorderOptions } from '@/components/docs/decision-previews';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    PropsTable,
    Example,
    ExampleLabel,
    Avatar,
    AvatarImage,
    AvatarFallback,
    AvatarBadge,
    AvatarGroup,
    AvatarGroupCount,
    AvatarSkeleton,
    Badge,
    BadgeDot,
    ColorRamp,
    ColorSet,
    CopyFormatToggle,
    IconBrowser,
    IconSizes,
    ShadowScale,
    TypeTable,
    FontSpecimens,
    TabularNumbers,
    SpaceScale,
    SpacingInContext,
    BorderWidthScale,
    RadiusScale,
    NestedRadius,
    RadiusBySize,
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
