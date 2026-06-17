import {
  type PropsWithChildren,
  useEffect,
  useRef,
  useState,
  useTransition
} from 'react';
import { useQueryCharacters } from '@shared/apiHooks';
import type { Character, CharacterSearchQuery, PageData } from '@shared/domain';
import { CharactersListStateContext } from './CharactersListStateContext';

export const CharactersListStateProvider = ({
  children
}: PropsWithChildren) => {
  const queryCharacters = useQueryCharacters();

  const [query, setQuery] = useState<CharacterSearchQuery>({});
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState<PageData<Character> | undefined>(
    undefined
  );
  const [isLoading, startTransition] = useTransition();
  const [list, setList] = useState<Character[]>([]);
  const [scrollTop, setScrollTop] = useState<number>(0);

  const isSuccess = !!response;
  const canNext =
    !response || (!!response?.info?.pages && page < response.info.pages);

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
  }, []);

  useEffect(() => {
    let isIgnore = false;

    startTransition(async () => {
      const response = await queryCharacters(page, query);
      if (isIgnore) {
        return;
      }
      setResponse(response);
      setList((value) => value.concat(response?.results ?? []));
    });

    return () => {
      isIgnore = true;
    };
  }, [page, query, queryCharacters]);

  const loadMore = () => {
    if (!isMounted.current || !canNext || isLoading || !isSuccess) {
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

  const updateCharacter = (character: Character) => {
    setList((characters) => {
      const index = characters.findIndex((item) => item.id === character.id);
      if (index < 0) {
        return characters;
      }
      return characters.map((item, i) => (i === index ? character : item));
    });
  };

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
        changeScrollTop,
        updateCharacter
      }}
    >
      {children}
    </CharactersListStateContext.Provider>
  );
};
