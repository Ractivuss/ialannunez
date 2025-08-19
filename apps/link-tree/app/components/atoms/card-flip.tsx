import { useState, useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardFlipProps {
  frontContent: ReactNode;
  backContent: ReactNode;
  isFlipped: boolean;
  onFlip?: () => void;
}

export function CardFlip({
  frontContent,
  backContent,
  isFlipped,
}: CardFlipProps) {
  const [cardHeight, setCardHeight] = useState<number | null>(null);
  const frontCardRef = useRef<HTMLDivElement>(null);
  const backCardRef = useRef<HTMLDivElement>(null);

  // Update card height based on content
  useEffect(() => {
    const updateHeight = () => {
      if (isFlipped) {
        // When flipped, use the height of the back card
        if (backCardRef.current) {
          const backContentHeight = backCardRef.current.scrollHeight;
          setCardHeight(backContentHeight);
        }
        return;
      }

      // When not flipped, use the height of the front card
      if (frontCardRef.current) {
        const frontContentHeight = frontCardRef.current.scrollHeight;
        console.log('Front content height:', frontContentHeight);
        setCardHeight(frontContentHeight);
      }
    };

    // Initial height calculation
    updateHeight();

    // Set up a resize observer to update height when content changes
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    if (frontCardRef.current) resizeObserver.observe(frontCardRef.current);
    if (backCardRef.current) resizeObserver.observe(backCardRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isFlipped]);

  return (
    <div className="perspective">
      <div
        className={cn(
          'card-flip-container relative transition-transform duration-400 transform-style-3d',
          isFlipped ? 'flipped' : ''
        )}
        style={{ height: cardHeight ? `${cardHeight}px` : 'auto' }}
      >
        {/* Front side */}
        <div
          ref={frontCardRef}
          className={cn(
            'absolute w-full backface-hidden transition-all duration-400',
            isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
          )}
        >
          {frontContent}
        </div>

        {/* Back side */}
        <div
          ref={backCardRef}
          className={cn(
            'absolute w-full backface-hidden transition-all duration-400 rotateY-180',
            isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
        >
          {isFlipped ? backContent : null}
        </div>
      </div>
    </div>
  );
}
