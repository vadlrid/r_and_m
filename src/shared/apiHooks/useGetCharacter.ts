import type { AxiosError } from 'axios';
import { HTTP_METHOD, useRequest } from '@shared/hooks';
import { convertCharacter, getErrorMessage } from './apiCommon';

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
