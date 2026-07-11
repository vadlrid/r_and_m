import { useQuery } from '@tanstack/react-query';
import { CHARACTERS_API } from '../api';
import { QUERY_KEYS } from './keys';

export const useCharacterInfo = (characterId: number) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: QUERY_KEYS.getCharacter(characterId),
    queryFn: () => CHARACTERS_API.getCharacter(characterId),
    enabled: true,
    staleTime: 30_000
  });

  return {
    data,
    isPending,
    isError,
    error
  };
};
