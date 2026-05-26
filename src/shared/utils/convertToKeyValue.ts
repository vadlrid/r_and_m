import type { KeyValue } from '@shared/types';

export const convertToKeyValueArray = <T>(
  keys: (T | null | undefined)[],
  getValue: (key?: T | null) => string = (key) => key?.toString?.() ?? ''
): KeyValue<T | null | undefined>[] => {
  return keys.map((key) => {
    const value = getValue(key);
    return { key, value };
  });
};
