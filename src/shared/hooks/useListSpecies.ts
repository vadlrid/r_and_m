import { useTranslation } from 'react-i18next';
import { ALL_SPECIES_VALUES } from '../domain';
import { capitalize, convertToKeyValueArray } from '../utils';

// t('species.human', 'Human')
// t('species.alien', 'Alien')
// t('species.humanoid', 'Humanoid')
// t('species.animal', 'Animal')
// t('species.robot', 'Robot')
// t('species.cronenberg', 'Cronenberg')
// t('species.disease', 'Disease')
// t('species.unknown', 'Unknown')
export const useListSpecies = () => {
  const { t } = useTranslation();
  return convertToKeyValueArray(ALL_SPECIES_VALUES, (item) => {
    const value = !item ? item : t(`species.${item.toLowerCase()}`);
    return capitalize(value);
  });
};
