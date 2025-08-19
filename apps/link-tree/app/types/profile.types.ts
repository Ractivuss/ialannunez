import { z } from 'zod';

// Zod schema for IconType
export const IconTypeSchema = z.enum([
  'github',
  'linkedin',
  'twitter',
  'globe',
]);
export type IconType = z.infer<typeof IconTypeSchema>;

// Zod schema for profile data validation
export const ProfileSchema = z.object({
  name: z.string(),
  isVerified: z.boolean().optional(),
  bio: z.string(),
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
