import { Menu, X } from 'lucide-react';
import { useState, useRef } from 'react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/atoms/drawer';
import { ScrollToIdTypes } from '~/app/rxjs/subjects/scroll.subject';
import { useEventListener } from '~/app/hooks/useEventListener';

const menuItems: { label: string; href: ScrollToIdTypes }[] = [
  {
    label: 'Alan Núñez',
    href: 'home',
  },
  {
    label: 'Experience',
    href: 'experience',
  },
  {
    label: 'Recommendations',
    href: 'recommendations',
  },
];

type Props = {
  onMenuClick: (id: ScrollToIdTypes) => void;
};

export const DrawerMenu = ({ onMenuClick }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEventListener('click', (event: Event) => {
    if (!drawerRef.current || !triggerRef.current) return;

    const isDrawerClick = drawerRef.current.contains(event.target as Node);
    const isTriggerClick = triggerRef.current.contains(event.target as Node);

    if (isOpen && !isDrawerClick && !isTriggerClick) setIsOpen(false);
  });

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      modal={false}
      dismissible={false}
    >
      <DrawerTrigger asChild className="md:hidden">
        <div ref={triggerRef}>
          <Menu />
        </div>
      </DrawerTrigger>
      <DrawerContent
        ref={drawerRef}
        className="flex flex-col gap-4 bg-white/5 backdrop-blur-sm shadow-lg p-4 border-none"
      >
        <DrawerHeader className="mb-4">
          <DrawerTitle className="text-white text-2xl font-bold flex justify-end items-center">
            <X className="w-6 h-6" onClick={() => setIsOpen(false)} />
          </DrawerTitle>
        </DrawerHeader>
        {menuItems.map((item) => (
          <button
            key={`${item.href}-drawer-menu`}
            onClick={() => onMenuClick(item.href)}
            onTouchStart={() => onMenuClick(item.href)}
            className="hover:text-primary transition-colors duration-300 text-lg cursor-pointer bg-transparent border-none text-white pointer-events-auto touch-manipulation"
            style={{ touchAction: 'manipulation' }}
          >
            {item.label}
          </button>
        ))}
      </DrawerContent>
    </Drawer>
  );
};
