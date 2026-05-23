import { capitalize, convertToKeyValueArray } from '../utils';

export enum Status {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown'
}

export const ALL_STATUS_VALUES = Object.values(Status);

export const LIST_STATUS = convertToKeyValueArray(
  ALL_STATUS_VALUES,
  capitalize
);
