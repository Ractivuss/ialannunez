import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { cn } from '@/utils/tailwind.utils';
import { timeoutCallback } from '@/utils/timeout';
import { Skeleton } from './skeleton';

type AvatarFlipProps = {
  frontAvatarSrc: string;
  backAvatarSrc: string;
  avatarFallback: string;
};

export const AvatarFlip = ({
  frontAvatarSrc,
  backAvatarSrc,
}: AvatarFlipProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (isFlipped) return;
    setIsFlipped(true);
    timeoutCallback(() => {
      setIsFlipped(false);
    }, 500);
  };

  // * Allows the avatar to be flipped and held if touch is held down
  // const handleStart = () => {
  //   if (isFlipped) return; // Prevent flipping if animation is already in progress
  //   setIsFlipped(true);
  // };

  // const handleEnd = () => {
  //   if (!isFlipped) return; // Prevent flipping if animation is already in progress
  //   setIsFlipped(false);
  // };

  // const handleCancel = () => {
  //   // Handle touch cancellation (when user drags away)
  //   if (isFlipped) {
  //     setIsFlipped(false);
  //   }
  // };

  // const handleContextMenu = (e: React.MouseEvent) => {
  //   // Prevent context menu (right-click menu on desktop, long-press menu on mobile)
  //   e.preventDefault();
  // };

  return (
    <div
      className="perspective w-28 h-28 hover:cursor-pointer select-none"
      style={{
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'manipulation',
      }}
      onClick={handleClick}
      // onMouseDown={handleStart}
      // onMouseUp={handleEnd}
      // onMouseLeave={handleCancel}
      // onTouchStart={handleStart}
      // onTouchEnd={handleEnd}
      // onTouchCancel={handleCancel}
      // onContextMenu={handleContextMenu}
    >
      <div
        className={cn(
          'card-flip-container relative transition-transform duration-400 transform-style-3d',
          isFlipped ? 'flipped' : ''
        )}
      >
        {/* Front side */}
        <Avatar className="absolute backface-hidden">
          <AvatarImage
            className="aspect-square rounded-full"
            src={frontAvatarSrc}
            alt="Front avatar"
            loading="lazy"
          />
          <AvatarFallback>
            <Skeleton className="aspect-square rounded-full" />
          </AvatarFallback>
        </Avatar>

        {/* Back side */}
        <Avatar className="absolute backface-hidden rotateY-180">
          <AvatarImage
            className="aspect-square rounded-full"
            src={backAvatarSrc}
            alt="Back avatar"
            loading="lazy"
          />
          <AvatarFallback>
            <Skeleton className="aspect-square rounded-full" />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
