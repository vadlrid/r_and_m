import type { Gender } from './gender.ts';
import type { Species } from './species.ts';
import type { Status } from './status.ts';

export interface CharacterSearchQuery {
  name?: string;
  species?: Species;
  gender?: Gender;
  status?: Status;
}
