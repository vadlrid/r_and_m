import { capitalize, convertToKeyValueArray } from '../utils';

export enum Gender {
  FEMALE = 'Female',
  MALE = 'Male',
  GENDERLESS = 'Genderless',
  UNKNOWN = 'unknown'
}

export const ALL_GENDER_VALUES = Object.values(Gender);

export const LIST_GENDER = convertToKeyValueArray(
  ALL_GENDER_VALUES,
  capitalize
);
