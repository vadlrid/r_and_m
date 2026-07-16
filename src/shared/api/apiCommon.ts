import { type AxiosError } from 'axios';
import type { Character, CharacterResponse } from '@shared/domain';

export const getErrorMessage = (error: AxiosError<{ error: string }>) =>
  error.response?.data?.error ?? '';

export const convertCharacter = (
  characterResponse: CharacterResponse
): Character => {
  const { id, name, status, species, type, location, origin, gender, image } =
    characterResponse;
  return {
    id,
    name,
    type,
    status,
    species,
    gender,
    image,
    location: location.name,
    origin: origin.name
  };
};

export const isAbortError = (error: unknown) => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    error.name === 'AbortError'
  );
};
