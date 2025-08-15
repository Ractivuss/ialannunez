import { z } from 'zod';

// Zod schema for IconType
export const IconTypeSchema = z.enum([
  'github',
  'linkedin',
  'twitter',
  'globe',
]);
export type IconType = z.infer<typeof IconTypeSchema>;

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
  'pattern-waves',
  'pattern-hexagons',
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

// Zod schema for profile data validation
export const ProfileSchema = z.object({
  name: z.string(),
  isVerified: z.boolean().optional(),
  bio: z.string(),
  themeSettings: z.object({
    font: FontTypeSchema,
    mode: ModeTypeSchema,
    colorTheme: ColorThemeTypeSchema,
    pattern: PatternTypeSchema,
    borderRadius: BorderRadiusTypeSchema,
    gradient: z.string(),
    effects: z.object({
      shadow: z.boolean(),
      glassmorphism: z.boolean(),
      cardOpacity: z.number(),
      animationSpeed: z.number(),
    }),
  }),
  links: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      url: z.string().url(),
      icon: IconTypeSchema,
    })
  ),
});

export type Profile = z.infer<typeof ProfileSchema>;
