import type {
  Character,
  CharacterResponse,
  CharacterSearchQuery,
  PageData
} from '@shared/domain';
import { convertCharacter, getErrorMessage } from './apiCommon';
import { HTTP_METHOD, doRequest } from './doRequest';

const APP_BASE_URL = import.meta.env.BASE_URL;

class CharactersApi {
  constructor(private baseUrl: string) {}

  async getCharacter(
    id: number,
    signal?: AbortSignal
  ): Promise<Character | undefined> {
    return await doRequest<Character, CharacterResponse, { error: string }>({
      url: `/character/${id}`,
      method: HTTP_METHOD.GET,
      baseUrl: this.baseUrl,
      convertResponse: convertCharacter,
      getErrorMessage,
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

    return await doRequest<
      PageData<Character>,
      PageData<CharacterResponse>,
      { error: string }
    >({
      url: `/character`,
      method: HTTP_METHOD.GET,
      baseUrl: this.baseUrl,
      convertResponse: (
        response: PageData<CharacterResponse>
      ): PageData<Character> => ({
        ...response,
        results: response.results.map(convertCharacter)
      }),
      getErrorMessage,
      params,
      signal
    });
  }
}

export const CHARACTERS_API = new CharactersApi(APP_BASE_URL);
