import {
  convertCharacter,
  getErrorMessage,
  useCommonErrorHandler
} from '@shared/apiHooks/apiCommon';
import { HTTP_METHOD, useRequest } from '@shared/hooks';

export const useGetCharacter = (id: number) => {
  return useRequest({
    url: `/character/${id}`,
    method: HTTP_METHOD.GET,
    convertResponse: convertCharacter,
    getErrorMessage,
    handleError: useCommonErrorHandler()
  });
};
