import { memo, useCallback } from 'react';
import { StatusCircle } from '@components/statusCircle';
import type { Character } from '@shared/domain';

interface CharacterCardViewProps {
  data: Character;
  onOpen?: () => void;
}

export const CharacterCardView = memo(
  ({ data, onOpen }: CharacterCardViewProps) => {
    const handleClick = useCallback(() => onOpen?.(), [onOpen]);
    return (
      <>
        <label className='character-card__content__title' onClick={handleClick}>
          {data.name}
        </label>
        <div className='character-card__content__field-group'>
          <label>Gender</label>
          <div className='character-card__content__text'>{data.gender}</div>
        </div>
        <div className='character-card__content__field-group'>
          <label>Species</label>
          <div className='character-card__content__text'>{data.species}</div>
        </div>
        <div className='character-card__content__field-group'>
          <label>Location</label>
          <div className='character-card__content__text'>{data.location}</div>
        </div>
        <div className='character-card__content__field-group'>
          <label>Status</label>
          <div className='character-card__content__text character-card__content__status'>
            {data.status}
            <StatusCircle status={data.status} />
          </div>
        </div>
      </>
    );
  }
);
