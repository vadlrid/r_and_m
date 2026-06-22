import type { AxiosError } from 'axios';
import { HTTP_METHOD, convertCharacter, getErrorMessage } from '@shared/api';
import { useRequest } from '@shared/hooks';

export const useGetCharacter = (
  id: number,
  handleError?: (error: AxiosError) => boolean
) => {
  return useRequest({
    url: `/character/${id}`,
    method: HTTP_METHOD.GET,
    convertResponse: convertCharacter,
    getErrorMessage,
    handleError
  });
};
