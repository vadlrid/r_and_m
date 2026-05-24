import type { Gender } from './gender';
import type { Species } from './species';
import type { Status } from './status';

export interface CharacterSearchQuery {
  name?: string;
  species?: Species;
  gender?: Gender;
  status?: Status;
}
