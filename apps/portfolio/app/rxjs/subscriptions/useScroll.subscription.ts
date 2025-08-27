import { useEffect } from 'react';
import { scrollSubject$, ScrollToEvent } from '@/rxjs/subjects/scroll.subject';

type ScrollSubscriptionCallback = (event: ScrollToEvent) => void;

export const useScrollSubscription = (callback: ScrollSubscriptionCallback) => {
  useEffect(() => {
    const subscription = scrollSubject$.subscribe({
      next: callback,
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [callback]);
};
