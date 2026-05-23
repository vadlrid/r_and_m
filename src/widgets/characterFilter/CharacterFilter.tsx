import { useCallback, useEffect, useState } from 'react';
import { Search } from '@components/icons';
import { InputField } from '@components/inputField';
import { Select } from '@components/select';
import {
  type CharacterSearchQuery,
  LIST_GENDER,
  LIST_SPECIES,
  LIST_STATUS
} from '@shared/domain';
import { useDebounce } from '@shared/hooks';
import { Size } from '@shared/types';
import { classNames } from '@shared/utils';

interface CharacterFilterProps {
  className?: string;
  query?: CharacterSearchQuery;
  onQueryChange?: (query: CharacterSearchQuery) => void;
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

  const [name, setName] = useState<string | undefined>(query.name);
  const debouncedName = useDebounce(name);

  useEffect(() => {
    handleQueryChange({ name: debouncedName });
  }, [debouncedName, handleQueryChange]);

  return (
    <section className={classNames(externalClassName, 'character-filter')}>
      <InputField
        size={Size.LARGE}
        hasBorder
        Prefix={Search}
        placeholder='Filter by name...'
        value={name}
        onChange={setName}
      />
      <Select
        size={Size.LARGE}
        placeholder='Species'
        items={LIST_SPECIES}
        selectedItem={query.species}
        onChange={(species) => handleQueryChange({ species })}
        hasEmptyOption
      />
      <Select
        size={Size.LARGE}
        placeholder='Gender'
        items={LIST_GENDER}
        selectedItem={query.gender}
        onChange={(gender) => handleQueryChange({ gender })}
        hasEmptyOption
      />
      <Select
        size={Size.LARGE}
        placeholder='Status'
        items={LIST_STATUS}
        selectedItem={query.status}
        onChange={(status) => handleQueryChange({ status })}
        hasEmptyOption
      />
    </section>
  );
};
