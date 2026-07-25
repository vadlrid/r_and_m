import { useTranslation } from 'react-i18next';
import { ALL_SPECIES_VALUES } from '../domain';
import { capitalize, convertToKeyValueArray } from '../utils';

export const useListSpecies = () => {
  const { t } = useTranslation();
  return convertToKeyValueArray(ALL_SPECIES_VALUES, (item) => {
    const value = !item ? item : t(`species.${item.toLowerCase()}`);
    return capitalize(value);
  });
};
