import type { CharacterResponse } from './characterResponse';

export interface Character extends Pick<
  CharacterResponse,
  'id' | 'name' | 'status' | 'species' | 'gender' | 'image' | 'type'
> {
  origin: string;
  location: string;
}
