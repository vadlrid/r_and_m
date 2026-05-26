import type { KeyValue } from '@shared/types';

export interface SelectOptionProps<T> {
  data: KeyValue<T | null | undefined>;
}

export const DefaultSelectOption = <T,>({ data }: SelectOptionProps<T>) =>
  data.value;
