import { useCallback, useMemo, useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from '@components/icons';
import { InputField } from '@components/inputField';
import { Select } from '@components/select';
import { type CharacterSearchQuery } from '@shared/domain';
import { useListGender, useListSpecies, useListStatus } from '@shared/hooks';
import { Size } from '@shared/types';
import { classNames, debounce } from '@shared/utils';

const DEBOUNCE_TIMEOUT = 300;

interface CharacterFilterProps {
  className?: string;
  query?: CharacterSearchQuery;
  onQueryChange?(query: CharacterSearchQuery): void;
}

const areQueriesEqual = (
  a?: CharacterSearchQuery,
  b?: CharacterSearchQuery
) => {
  if (a === b) {
    return true;
  }
  if (
    (a === undefined && b !== undefined) ||
    (a !== undefined && b === undefined)
  ) {
    return false;
  }
  return (
    a?.name === b?.name &&
    a?.species === b?.species &&
    a?.gender === b?.gender &&
    a?.status === b?.status
  );
};

export const CharacterFilter = ({
  className: externalClassName,
  query = {},
  onQueryChange
}: CharacterFilterProps) => {
  const { t } = useTranslation();

  const listGender = useListGender();
  const listSpecies = useListSpecies();
  const listStatus = useListStatus();

  const handleQueryChange = useCallback(
    (updatedQuery: CharacterSearchQuery) => {
      const newQuery: CharacterSearchQuery = { ...query, ...updatedQuery };
      if (areQueriesEqual(query, newQuery)) {
        return;
      }
      onQueryChange?.(newQuery);
    },
    [query, onQueryChange]
  );

  const handleQueryChangeDebounced = useMemo(
    () => debounce(handleQueryChange, DEBOUNCE_TIMEOUT),
    [handleQueryChange]
  );

  const [, startTransition] = useTransition();
  const [name, setName] = useState<string | undefined>(query.name);

  const handleNameChange = (name: string) => {
    setName(name);
    startTransition(() => handleQueryChangeDebounced({ name }));
  };

  return (
    <section className={classNames(externalClassName, 'character-filter')}>
      <InputField
        size={Size.LARGE}
        hasBorder
        Prefix={Search}
        placeholder={t('filter.name', 'Filter by name...')}
        value={name}
        onChange={handleNameChange}
      />
      <Select
        size={Size.LARGE}
        placeholder={t('filter.species', 'Species')}
        items={listSpecies}
        selectedItem={query.species}
        onChange={(species) => handleQueryChange({ species })}
        hasEmptyOption
      />
      <Select
        size={Size.LARGE}
        placeholder={t('filter.gender', 'Gender')}
        items={listGender}
        selectedItem={query.gender}
        onChange={(gender) => handleQueryChange({ gender })}
        hasEmptyOption
      />
      <Select
        size={Size.LARGE}
        placeholder={t('filter.status', 'Status')}
        items={listStatus}
        selectedItem={query.status}
        onChange={(status) => handleQueryChange({ status })}
        hasEmptyOption
      />
    </section>
  );
};
