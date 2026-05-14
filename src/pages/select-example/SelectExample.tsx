import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { type ISelectOptionProps, Select } from '@components/select';
import { type KeyValue, Size } from '@shared/types';
import './SelectExample.css';

// todo: Временный компонент для примера select'ов

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

export const SelectExample = () => {
  const [specie, setSpecie] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<Status | undefined>(undefined);

  useEffect(() => console.log('SPECIE CHANGED', specie), [specie]);
  useEffect(() => console.log('STATUS CHANGED', status), [status]);

  return (
    <section className='select-example'>
      <strong>Large</strong>
      <strong>Small</strong>
      <Select
        size={Size.LARGE}
        items={SPECIES}
        placeholder='Species'
        selectedItem={specie}
        onSelectedItemChange={setSpecie}
      />
      <Select
        size={Size.SMALL}
        items={STATUS_LIST}
        placeholder='Status'
        selectedItem={status}
        onSelectedItemChange={setStatus}
        optionComponent={StatusOption}
      />
    </section>
  );
};
