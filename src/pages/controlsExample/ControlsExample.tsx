import { useState } from 'react';
import { Search } from '@components/icons';
import { type ISelectOptionProps, Select } from '@components/select';
import { type KeyValue, Size } from '@shared/types';
import { classNames } from '@shared/utils';
import { InputField } from '../../components/inputField';
import './ControlsExample.scss';

// todo: Временный компонент для примера и отладки различных контролов

const SPECIES: KeyValue<string>[] = [
  { key: 'human', value: 'Human' },
  { key: 'alien', value: 'Alien' },
  { key: 'humanoid', value: 'Humanoid' },
  { key: 'animal', value: 'Animal' },
  { key: 'robot', value: 'Robot' }
];

enum Status {
  ALIVE,
  DEAD,
  UNKNOWN
}

const STATUS_COLORS: Record<Status, string> = {
  [Status.ALIVE]: 'green',
  [Status.DEAD]: 'red',
  [Status.UNKNOWN]: 'orange'
};

const STATUS_LIST: KeyValue<Status>[] = [
  { key: Status.ALIVE, value: 'Alive' },
  { key: Status.DEAD, value: 'Dead' },
  { key: Status.UNKNOWN, value: 'Unknown' }
];

const StatusOption = ({ data }: ISelectOptionProps<Status>) => {
  const circleColor = STATUS_COLORS[data.key];
  return (
    <div className='status-option'>
      <span>{data.value}</span>
      <div
        className={classNames(
          'status-option__circle',
          `status-option__circle_${circleColor}`
        )}
      ></div>
    </div>
  );
};

export const ControlsExample = () => {
  const [specie, setSpecie] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<Status | undefined>(undefined);

  const [character, setCharacter] = useState<string>('Rick Sanchez');
  const [filter, setFilter] = useState<string>('');

  return (
    <section className='controls-example'>
      <strong>Large</strong>
      <strong>Small</strong>
      <Select
        size={Size.LARGE}
        items={SPECIES}
        placeholder='Species'
        selectedItem={specie}
        onChange={setSpecie}
      />
      <Select
        size={Size.SMALL}
        items={STATUS_LIST}
        placeholder='Status'
        selectedItem={status}
        onChange={setStatus}
        OptionComponent={StatusOption}
      />
      <div className='spacer' />
      <strong>Form Field</strong>
      <strong>Filter Field</strong>
      <InputField value={character} onChange={setCharacter} />
      <InputField
        placeholder='Filter by name...'
        value={filter}
        onChange={setFilter}
        hasBorder
        Prefix={Search}
      />
      <div className='spacer' />
      <strong>Form Field Small</strong>
      <strong>Filter Field Small</strong>
      <InputField
        size={Size.SMALL}
        value={character}
        onChange={setCharacter}
        isDisabled
      />
      <InputField
        size={Size.SMALL}
        placeholder='Filter...'
        value={filter}
        onChange={setFilter}
        hasBorder
        Prefix={Search}
      />
    </section>
  );
};
