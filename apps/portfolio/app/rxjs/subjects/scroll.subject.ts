import { Subject } from 'rxjs';

export type ScrollToIdTypes = 'home' | 'experience' | 'recommendations';

export type ScrollToEvent = {
  id: ScrollToIdTypes;
};

export const scrollSubject$ = new Subject<ScrollToEvent>();
