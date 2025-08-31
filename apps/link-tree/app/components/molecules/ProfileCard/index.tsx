import { Card, CardContent } from '@atoms/card';
import { VerifiedBadge } from '@atoms/verified-badge';
import { cn } from '@/utils/tailwind.utils';
import { LinkItem } from '@molecules/LinkItem';
import { IconType, Profile } from '@/types/profile.types';
import { useTheme } from '@/providers/ThemeProvider';
import { useGetProfile } from '@/services/profile';
import { AvatarFlip } from '@/components/atoms/avatar-flip';
import { Skeleton } from '@/components/atoms/skeleton';

type ProfileCardSkeletonProps = {
  links: Profile['links'];
};

export const ProfileCardSkeleton = ({ links }: ProfileCardSkeletonProps) => {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-6 flex flex-col items-center space-y-4">
        <Skeleton className="aspect-square rounded-full w-28 h-28" />
        <Skeleton className="h-[28px] w-full max-w-md" />
        <Skeleton className="h-[80px] w-full max-w-md" />
        <div className="w-full space-y-3 mt-6">
          {links.map((link) => (
            <Skeleton
              key={`${link.id}-skeleton-link`}
              className="h-[58px] w-full max-w-md"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const ProfileCard = () => {
  const { data: profile } = useGetProfile();
  const { themeSettings, isHydrated } = useTheme();
  const links = profile.links;

  if (!isHydrated) return <ProfileCardSkeleton links={links} />;

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
          <AvatarFlip
            frontAvatarSrc={'/images/me_professional.webp'}
            backAvatarSrc={'/images/me_tiny.webp'}
            avatarFallback={profile.name.charAt(0)}
          />
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
