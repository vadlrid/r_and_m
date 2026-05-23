import type { CharacterResponse } from './character-response.ts';

export interface Character extends Pick<
  CharacterResponse,
  'id' | 'name' | 'status' | 'species' | 'gender' | 'image'
> {
  location: string;
}
