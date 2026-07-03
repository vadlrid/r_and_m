import type { AxiosError } from 'axios';
import type {
  Character,
  CharacterResponse,
  CharacterSearchQuery,
  PageData
} from '@shared/domain';
import { convertCharacter, getErrorMessage } from './apiCommon';
import { API_BASE_URL, REQUEST_ATTEMPTS } from './characterApiConfig';
import { type DoRequestProps, HTTP_METHOD, doRequest } from './doRequest';

class CharactersApi {
  constructor(
    private baseUrl: string,
    private maxAttempts: number
  ) {}

  private handleError?: (error: AxiosError) => boolean;

  overrideHandleError(handleError: (error: AxiosError) => boolean): this {
    this.handleError = handleError;
    return this;
  }

  private getRequest<T, R, E>(
    params: Omit<DoRequestProps<T, R, E>, 'method' | 'baseUrl' | 'maxAttempts'>
  ): Promise<T | undefined> {
    return doRequest<T, R, E>({
      ...params,
      method: HTTP_METHOD.GET,
      baseUrl: this.baseUrl,
      maxAttempts: this.maxAttempts
    });
  }

  async getCharacter(
    id: number,
    signal?: AbortSignal
  ): Promise<Character | undefined> {
    const handleError = this.handleError;
    this.handleError = undefined;

    return await this.getRequest<
      Character,
      CharacterResponse,
      { error: string }
    >({
      url: `/character/${id}`,
      convertResponse: convertCharacter,
      getErrorMessage,
      handleError,
      signal
    });
  }

  async queryCharacters(
    page: number,
    query: CharacterSearchQuery,
    signal?: AbortSignal
  ): Promise<PageData<Character> | undefined> {
    const name = query?.name?.trim()?.toLowerCase();
    const params = { ...query, name, page };

    const handleError = this.handleError;
    this.handleError = undefined;

    return this.getRequest<
      PageData<Character>,
      PageData<CharacterResponse>,
      { error: string }
    >({
      url: `/character`,
      convertResponse: (
        response: PageData<CharacterResponse>
      ): PageData<Character> => ({
        ...response,
        results: response.results.map(convertCharacter)
      }),
      getErrorMessage,
      handleError,
      params,
      signal
    });
  }
}

export const CHARACTERS_API = new CharactersApi(API_BASE_URL, REQUEST_ATTEMPTS);
