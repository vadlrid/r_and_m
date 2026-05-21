import { useCallback } from 'react';
import { Search } from '@components/icons';
import { InputField } from '@components/inputField';
import { Select } from '@components/select';
import {
  type CharacterSearchQuery,
  LIST_GENDER,
  LIST_SPECIES,
  LIST_STATUS
} from '@shared/domain';
import { Size } from '@shared/types';
import { classNames } from '@shared/utils';

interface CharacterFilterProps {
  className?: string;
  query?: CharacterSearchQuery;
  onQueryChange?: (query: CharacterSearchQuery) => void;
}

export const CharacterFilter = ({
  className: externalClassName,
  query = {},
  onQueryChange
}: CharacterFilterProps) => {
  const handleQueryChange = useCallback(
    (updatedQuery: CharacterSearchQuery) => {
      onQueryChange?.({ ...query, ...updatedQuery });
    },
    [query, onQueryChange]
  );

  return (
    <section className={classNames(externalClassName, 'character-filter')}>
      <InputField
        size={Size.LARGE}
        hasBorder
        Prefix={Search}
        placeholder='Filter by name...'
        value={query.name}
        onChange={(name) => handleQueryChange({ name })}
      />
      <Select
        size={Size.LARGE}
        placeholder='Species'
        items={LIST_SPECIES}
        selectedItem={query.species}
        onChange={(species) => handleQueryChange({ species })}
      />
      <Select
        size={Size.LARGE}
        placeholder='Gender'
        items={LIST_GENDER}
        selectedItem={query.gender}
        onChange={(gender) => handleQueryChange({ gender })}
      />
      <Select
        size={Size.LARGE}
        placeholder='Status'
        items={LIST_STATUS}
        selectedItem={query.status}
        onChange={(status) => handleQueryChange({ status })}
      />
    </section>
  );
};
