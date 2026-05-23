import { capitalize, convertToKeyValueArray } from '../utils';

export enum Species {
  HUMAN = 'Human',
  ALIEN = 'Alien',
  HUMANOID = 'Humanoid',
  ANIMAL = 'Animal',
  ROBOT = 'Robot',
  CRONENBERG = 'Cronenberg',
  DISEASE = 'Disease',
  UNKNOWN = 'Unknown'
}

export const ALL_SPECIES_VALUES = Object.values(Species);

export const LIST_SPECIES = convertToKeyValueArray(
  ALL_SPECIES_VALUES,
  capitalize
);
