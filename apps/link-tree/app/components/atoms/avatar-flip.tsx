import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { cn } from '../../utils/tailwind.utils';

type AvatarFlipProps = {
  frontAvatarSrc: string;
  backAvatarSrc: string;
  avatarFallback: string;
};

export const AvatarFlip = ({
  frontAvatarSrc,
  backAvatarSrc,
  avatarFallback,
}: AvatarFlipProps) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleStart = () => {
    if (isFlipped) return; // Prevent flipping if animation is already in progress
    setIsFlipped(true);
  };

  const handleEnd = () => {
    if (!isFlipped) return; // Prevent flipping if animation is already in progress
    setIsFlipped(false);
  };

  const handleCancel = () => {
    // Handle touch cancellation (when user drags away)
    if (isFlipped) {
      setIsFlipped(false);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    // Prevent context menu (right-click menu on desktop, long-press menu on mobile)
    e.preventDefault();
  };

  return (
    <div
      className="perspective w-28 h-28 hover:cursor-pointer select-none"
      style={{
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'manipulation',
      }}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleCancel}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchCancel={handleCancel}
      onContextMenu={handleContextMenu}
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
          />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>

        {/* Back side */}
        <Avatar className="absolute backface-hidden rotateY-180">
          <AvatarImage
            className="aspect-square rounded-full"
            src={backAvatarSrc}
          />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
