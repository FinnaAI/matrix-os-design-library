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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { Textarea } from '@/components/ui/textarea';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
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
    Button,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
    Textarea,
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
    Label,
    Checkbox,
    RadioGroup,
    RadioGroupItem,
    Switch,
    Separator,
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
