import { profileData } from '@/lib/profile';
import { Profile, ProfileSchema } from '@/types/profile';

const cachedProfile = new Map<'profile', Profile>();

export function getProfileData(): Profile {
  try {
    if (cachedProfile.has('profile')) {
      const cached = cachedProfile.get('profile');
      if (!cached) throw new Error('Cached profile not found');
      return cached;
    }

    // Validate with Zod
    const profile = ProfileSchema.parse(profileData);
    cachedProfile.set('profile', profile);
    return profile;
  } catch (error) {
    console.error('Error loading profile data:', error);

    // Return safe defaults if parsing fails
    const defaultProfile: Profile = {
      name: 'User',
      bio: 'Welcome to my link tree',
      themeSettings: {
        font: 'font-sans',
        mode: 'light',
        colorTheme: 'default',
        pattern: 'pattern-none',
        gradient: 'none',
        borderRadius: 'rounded-lg',
        effects: {
          shadow: true,
          glassmorphism: false,
          cardOpacity: 1,
          animationSpeed: 100,
        },
      },
      links: [],
    };

    return defaultProfile;
  }
}
