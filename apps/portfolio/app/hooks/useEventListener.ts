'use client';
import { useEffect } from 'react';

export const useEventListener = (
  event: string,
  callback: (event: Event) => void,
  element?: HTMLElement | Window
) => {
  useEffect(() => {
    const targetElement = element || (typeof window !== 'undefined' ? window : null);
    
    if (!targetElement) return;
    
    targetElement.addEventListener(event, callback);
    return () => targetElement.removeEventListener(event, callback);
  }, [event, callback, element]);
};
