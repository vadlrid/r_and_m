import { Gender } from '@shared/domain/gender.ts';
import { Species } from '@shared/domain/species.ts';
import { Status } from '@shared/domain/status.ts';

export interface CharacterResponse {
  id: number;
  name: string;
  type: string;
  status: Status;
  species: Species;
  gender: Gender;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
