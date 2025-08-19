import { z } from 'zod';

// Zod schema for FontType
export const FontTypeSchema = z.enum(['font-sans', 'font-mono', 'font-serif']);
export type FontType = z.infer<typeof FontTypeSchema>;

// Zod schema for ModeType
export const ModeTypeSchema = z.enum(['light', 'dark']);
export type ModeType = z.infer<typeof ModeTypeSchema>;

// Zod schema for PatternType
export const PatternTypeSchema = z.enum([
  'pattern-none',
  'pattern-dots',
  'pattern-grid',
  'pattern-stripes',
]);
export type PatternType = z.infer<typeof PatternTypeSchema>;

// Zod schema for ColorThemeType
export const ColorThemeTypeSchema = z.enum([
  'default',
  'rose',
  'green',
  'purple',
  'orange',
  'blue',
  'teal',
  'pink',
]);
export type ColorThemeType = z.infer<typeof ColorThemeTypeSchema>;

// Zod schema for BorderRadiusType
export const BorderRadiusTypeSchema = z.enum([
  'rounded-none',
  'rounded-sm',
  'rounded',
  'rounded-lg',
]);
export type BorderRadiusType = z.infer<typeof BorderRadiusTypeSchema>;

export const PageBackgroundSchema = z.enum([
  'default',
  'slate',
  'pink',
  'green',
  'purple',
  'orange',
  'blue',
  'yellow',
]);
export type PageBackgroundType = z.infer<typeof PageBackgroundSchema>;

// Theme Settings Schema - extracted from Profile schema
export const ThemeSettingsSchema = z.object({
  font: FontTypeSchema,
  mode: ModeTypeSchema,
  colorTheme: ColorThemeTypeSchema,
  pattern: PatternTypeSchema,
  borderRadius: BorderRadiusTypeSchema,
  gradient: z.string(),
  pageBackground: PageBackgroundSchema,
  effects: z.object({
    shadow: z.boolean(),
    glassmorphism: z.boolean(),
    cardOpacity: z.number(),
    animationSpeed: z.number(),
  }),
});

export type ThemeSettings = z.infer<typeof ThemeSettingsSchema>;
