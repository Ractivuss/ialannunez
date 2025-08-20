import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { cn } from '../../utils/tailwind.utils';
import { timeoutCallback } from '@/utils/timeout';

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

  const handleClick = () => {
    setIsFlipped(true);
    timeoutCallback(() => {
      setIsFlipped(false);
    }, 700);
  };

  return (
    <div className="perspective w-36 h-36 hover:cursor-pointer" onClick={handleClick}>
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
