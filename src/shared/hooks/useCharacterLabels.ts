import { useTranslation } from 'react-i18next';

export const useCharacterLabels = () => {
  const { t } = useTranslation();

  const lblGender = t('character.gender', 'Gender');
  const lblSpecies = t('character.species', 'Species');
  const lblLocation = t('character.location', 'Location');
  const lblStatus = t('character.status', 'Status');
  const lblOrigin = t('character.origin', 'Origin');
  const lblType = t('character.type', 'Type');

  return {
    lblGender,
    lblSpecies,
    lblLocation,
    lblStatus,
    lblOrigin,
    lblType
  };
};
