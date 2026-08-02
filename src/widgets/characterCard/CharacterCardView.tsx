import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusCircle } from '@components/statusCircle';
import type { Character } from '@shared/domain';
import { useCharacterLabels } from '@shared/hooks';

interface CharacterCardViewProps {
  data: Character;
  onOpen?(): void;
}

export const CharacterCardView = memo(
  ({ data, onOpen }: CharacterCardViewProps) => {
    const handleClick = useCallback(() => onOpen?.(), [onOpen]);
    const { t } = useTranslation();
    const { lblGender, lblSpecies, lblLocation, lblStatus } =
      useCharacterLabels();
    return (
      <>
        <label className='character-card__title' onClick={handleClick}>
          {data.name}
        </label>
        <div className='field-group'>
          <label>{lblGender}</label>
          <div className='field-group__text'>
            {t(`gender.${data.gender.toLowerCase()}`)}
          </div>
        </div>
        <div className='field-group'>
          <label>{lblSpecies}</label>
          <div className='field-group__text'>
            {t(`species.${data.species.toLowerCase()}`)}
          </div>
        </div>
        <div className='character-card__content__field-group'>
          <label>{lblLocation}</label>
          <div className='field-group__text'>{data.location}</div>
        </div>
        <div className='field-group'>
          <label>{lblStatus}</label>
          <div className='field-group__status'>
            {t(`status.${data.status.toLowerCase()}`)}
            <StatusCircle status={data.status} />
          </div>
        </div>
      </>
    );
  }
);
