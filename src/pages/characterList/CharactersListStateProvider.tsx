import { type PropsWithChildren, useEffect, useState } from 'react';
import { useQueryCharacters } from '@shared/apiHooks';
import type { Character, CharacterSearchQuery, PageData } from '@shared/domain';
import { CharactersListStateContext } from './CharactersListStateContext';

export const CharactersListStateProvider = ({
  children
}: PropsWithChildren) => {
  const { queryCharacters, isLoading } = useQueryCharacters();

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
    if (!canNext || isLoading) {
      return;
    }

    if (isSuccess) {
      setPage((page) => page + 1);
    } else {
      setQuery((value) => ({ ...value }));
    }
  };

  const changeQuery = (newQuery: CharacterSearchQuery) => {
    setQuery(newQuery);
    setScrollTop(0);
    setList([]);
    setPage(1);
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
