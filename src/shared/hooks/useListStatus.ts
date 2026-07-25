import { useTranslation } from 'react-i18next';
import { ALL_STATUS_VALUES } from '../domain';
import { capitalize, convertToKeyValueArray } from '../utils';

export const useListStatus = () => {
  const { t } = useTranslation();
  return convertToKeyValueArray(ALL_STATUS_VALUES, (item) => {
    const value = !item ? item : t(`status.${item.toLowerCase()}`);
    return capitalize(value);
  });
};
