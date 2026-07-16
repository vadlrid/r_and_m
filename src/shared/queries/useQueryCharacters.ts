import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { CHARACTERS_API } from '../api';
import type { Character, CharacterSearchQuery, PageData } from '../domain';
import { QUERY_KEYS } from './keys';

interface ItemLocation {
  pageIndex: number;
  itemIndex: number;
}

export const useQueryCharacters = (searchQuery: CharacterSearchQuery) => {
  const queryClient = useQueryClient();

  const infiniteQuery = useInfiniteQuery({
    queryKey: QUERY_KEYS.queryCharacters(searchQuery),
    queryFn: ({ pageParam }) =>
      CHARACTERS_API.queryCharacters(pageParam, searchQuery),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const next = lastPage?.info.next;
      if (!next) {
        return undefined;
      }
      const url = new URL(next);
      const page = Number(url.searchParams.get('page'));
      return isNaN(page) ? undefined : page;
    },
    enabled: true
  });

  const itemIndex = useMemo(() => {
    const locationIndex = new Map<number, ItemLocation>();

    infiniteQuery.data?.pages.forEach((page, pageIndex) => {
      page?.results.forEach((item, itemIndex) => {
        locationIndex.set(item.id, { pageIndex, itemIndex });
      });
    });

    return locationIndex;
  }, [infiniteQuery]);

  const data = useMemo(() => {
    return infiniteQuery.data?.pages.flatMap((page) => page?.results ?? []);
  }, [infiniteQuery]);

  const updateItemInCache = useCallback(
    (character: Character) => {
      queryClient.setQueryData<{
        pages: PageData<Character>[] | undefined;
        pageParams: number[];
      }>(QUERY_KEYS.queryCharacters(searchQuery), (current) => {
        const location = itemIndex.get(character.id);

        if (!current?.pages || !location) {
          return current;
        }

        const pages = [...current.pages];

        let page = pages[location.pageIndex];
        if (!page || !page?.results?.[location.itemIndex]) {
          return current;
        }

        page = {
          ...page,
          results: [...page.results]
        };
        pages[location.pageIndex] = page;

        page.results[location.itemIndex] = character;

        return {
          ...current,
          pages
        };
      });
    },
    [queryClient, searchQuery, itemIndex]
  );

  return {
    data,
    originalData: infiniteQuery.data,
    isPending: infiniteQuery.isPending,
    isError: infiniteQuery.isError,
    error: infiniteQuery.error,
    hasNextPage: infiniteQuery.hasNextPage,
    isFetchingNextPage: infiniteQuery.isFetchingNextPage,
    fetchNextPage: () => {
      infiniteQuery.fetchNextPage();
    },
    updateItemInCache
  };
};
