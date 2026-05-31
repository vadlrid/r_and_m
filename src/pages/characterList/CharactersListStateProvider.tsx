import { type PropsWithChildren, useEffect, useState } from 'react';
import { useQueryCharacters } from '@shared/apiHooks';
import type { Character, CharacterSearchQuery, PageData } from '@shared/domain';
import { CharactersListStateContext } from './CharactersListStateContext';

const REQUEST_ATTEMPTS = 5;

export const CharactersListStateProvider = ({
  children
}: PropsWithChildren) => {
  const { queryCharacters, isLoading } = useQueryCharacters(REQUEST_ATTEMPTS);

  const [query, setQuery] = useState<CharacterSearchQuery>({});
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState<PageData<Character> | undefined>(
    undefined
  );
  const [list, setList] = useState<Character[]>([]);
  const [scrollTop, setScrollTop] = useState<number>(0);

  const isSuccess = !!response;
  const canNext =
    !response || (!!response?.info?.pages && page < response.info.pages);

  useEffect(() => {
    queryCharacters(page, query).then((response) => {
      setResponse(response);
      setList((value) => value.concat(response?.results ?? []));
    });
  }, [page, query, queryCharacters]);

  const loadMore = () => {
    if (!canNext || isLoading || !isSuccess) {
      return;
    }
    setPage((page) => page + 1);
  };

  const changeQuery = (newQuery: CharacterSearchQuery) => {
    setScrollTop(0);
    setList([]);
    setPage(1);
    setQuery(newQuery);
  };

  const changeScrollTop = (value: number) => setScrollTop(value);

  return (
    <CharactersListStateContext.Provider
      value={{
        query,
        page,
        list,
        isLoading,
        scrollTop,
        changeQuery,
        loadMore,
        changeScrollTop
      }}
    >
      {children}
    </CharactersListStateContext.Provider>
  );
};
