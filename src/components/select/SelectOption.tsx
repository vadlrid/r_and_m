import type { KeyValue } from '@shared/types';

export interface ISelectOptionProps<T> {
  data: KeyValue<T>;
}

export const DefaultSelectOption = <T,>({ data }: ISelectOptionProps<T>) => (
  <>{data.value}</>
);
