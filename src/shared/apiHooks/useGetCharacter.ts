import { convertCharacter, getErrorMessage } from '@shared/apiHooks/apiCommon';
import { HTTP_METHOD, useRequest } from '@shared/hooks';

export const useGetCharacter = (id: number) =>
  useRequest({
    url: `/character/${id}`,
    method: HTTP_METHOD.GET,
    convertResponse: convertCharacter,
    getErrorMessage
  });
