import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { type AxiosError, HttpStatusCode } from 'axios';
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

export const useCommonErrorHandler = () => {
  const navigate = useNavigate();

  return useCallback(
    (error: AxiosError) => {
      switch (error.status) {
        case HttpStatusCode.NotFound:
          navigate('/404');
          return true;
        default:
          return false;
      }
    },
    [navigate]
  );
};
