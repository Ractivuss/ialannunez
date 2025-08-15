import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar';
import { Card, CardContent } from '@atoms/card';
import { VerifiedBadge } from '@atoms/verified-badge';
import { cn } from '@lib/utils';
import { getProfileData } from '@utils/profile';
import { LinkItem } from '@molecules/LinkItem';
import { IconType } from '@/types/profile';
import { useTheme } from '@/hooks/useTheme';

export const ProfileCard = () => {
  const profile = getProfileData();
  const { themeSettings } = useTheme();
  const links = profile.links;

  return (
    <Card
      className={cn(
        'shadow-lg border-2 bg-background',
        themeSettings.borderRadius,
        themeSettings.effects.shadow ? 'shadow-lg' : 'shadow-none',
        themeSettings.effects.glassmorphism && 'glassmorphism'
      )}
      style={{ opacity: themeSettings.effects.cardOpacity }}
    >
      <CardContent className="p-6">
        <div
          className={cn(
            'flex flex-col items-center space-y-4',
            themeSettings.font
          )}
        >
          <Avatar className="h-24 w-24">
            <AvatarImage src={'/images/me_tiny.webp'} alt={profile.name} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <h2 className="text-xl font-bold">{profile.name}</h2>
              {profile.isVerified && <VerifiedBadge />}
            </div>
            <p className="text-muted-foreground mt-1 text-sm max-w-md">
              {profile.bio}
            </p>
          </div>

          <div className="w-full space-y-3 mt-6">
            {links.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No links added yet. Click the edit button to add links.
              </p>
            ) : (
              links.map((link) => (
                <LinkItem
                  key={link.id}
                  icon={link.icon as IconType}
                  label={link.label}
                  url={link.url}
                />
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
