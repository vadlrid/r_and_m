import { Gender } from './gender.ts';
import { Species } from './species.ts';
import { Status } from './status.ts';

export interface Character {
  id: number;
  name: string;
  status: Status;
  species: Species;
  gender: Gender;
  location: string;
  image: string;
}
