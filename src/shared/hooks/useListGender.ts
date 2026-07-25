import { useTranslation } from 'react-i18next';
import { ALL_GENDER_VALUES } from '../domain';
import { capitalize, convertToKeyValueArray } from '../utils';

export const useListGender = () => {
  const { t } = useTranslation();
  return convertToKeyValueArray(ALL_GENDER_VALUES, (item) =>
    capitalize(!item ? item : t(`gender.${item.toLowerCase()}`))
  );
};
