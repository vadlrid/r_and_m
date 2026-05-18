import { useCallback, useState } from 'react';
import { Check, Close, Edit } from '@components/icons';
import { type Character } from '@shared/domain';
import { CharacterCardEdit } from './CharacterCardEdit.tsx';
import { CharacterCardView } from './CharacterCardView.tsx';
import './CharacterCard.scss';
import { useCharacterForm } from './CharacterForm.ts';

interface CharacterCardProps {
  data: Character;
  onChange?: (data: Character) => void;
  onOpen?: (data: Character) => void;
}

export const CharacterCard = ({
  data,
  onChange,
  onOpen
}: CharacterCardProps) => {
  const [isEditMode, setEditMode] = useState(false);

  const handleOpen = useCallback(() => onOpen?.(data), [data, onOpen]);

  const form = useCharacterForm(data, (updatedCharacter) => {
    onChange?.(updatedCharacter);
    setEditMode(false);
  });

  const handleCancel = () => {
    form.resetForm();
    setEditMode(false);
  };

  return (
    <section className='character-card'>
      {isEditMode ? (
        <div className='character-card__edit-confirm'>
          <Close role='button' onClick={handleCancel} />
          <Check role='button' onClick={() => form.submitForm()} />
        </div>
      ) : (
        <Edit
          className='character-card__edit-toggle'
          onClick={() => setEditMode(true)}
        />
      )}
      <div className='character-card__content'>
        <img role='button' src={data.image} />
        {isEditMode ? (
          <CharacterCardEdit form={form} />
        ) : (
          <CharacterCardView data={data} onOpen={handleOpen} />
        )}
      </div>
    </section>
  );
};
