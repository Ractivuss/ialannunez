import { Button } from '@atoms/button';
import { Edit2, Save } from 'lucide-react';

interface HeaderProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onSaveChanges: () => void;
}

export function Header({
  isEditMode,
  onToggleEditMode,
  onSaveChanges,
}: HeaderProps) {
  const handleClick = () => {
    // if in edit mode, save changes and toggle edit mode
    if (isEditMode) onSaveChanges();
    onToggleEditMode();
  };

  return (
    <div className="flex justify-end items-center">
      <Button
        variant="outline"
        size="icon"
        onClick={handleClick}
        aria-label={isEditMode ? 'Save changes' : 'Edit profile and links'}
      >
        {isEditMode ? (
          <Save className="h-4 w-4" />
        ) : (
          <Edit2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
