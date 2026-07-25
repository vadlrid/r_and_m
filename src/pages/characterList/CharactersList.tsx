import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { AxiosError, HttpStatusCode } from 'axios';
import { Indicator } from '@components/indicator';
import { ScrollContainer } from '@components/scrollContainer';
import { CharacterCard } from '@widgets/characterCard';
import { CharacterFilter } from '@widgets/characterFilter';
import type { Character } from '@shared/domain';
import { useQueryCharacters } from '@shared/queries';
import { Size } from '@shared/types';
import { useCharactersStore } from '@store/characters';
import './CharactersList.scss';

export const CharactersList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const scrollTop = useCharactersStore((state) => state.scrollTop);
  const searchQuery = useCharactersStore((state) => state.query);

  const listQuery = useQueryCharacters(searchQuery);

  const list = !listQuery.isError ? listQuery.data : [];
  const isLoading = listQuery.isPending || listQuery.isFetchingNextPage;
  const canNext = listQuery.hasNextPage;
  const isSuccess = !listQuery.isError && !!listQuery.data;

  const isNotFound =
    listQuery.isError &&
    listQuery.error instanceof AxiosError &&
    listQuery.error.status === HttpStatusCode.NotFound;

  const handleOpen = (character: Character) =>
    navigate(`/info/${character.id}`);

  const handleScrollTopChange = useCharactersStore(
    (state) => state.setScrollTop
  );
  const changeQuery = useCharactersStore((state) => state.setQuery);

  const handleBottomReach = () => {
    if (isLoading || !canNext || !isSuccess) {
      return;
    }
    listQuery.fetchNextPage();
  };

  useEffect(() => {
    if (isNotFound) {
      navigate('/404');
    }
  }, [isNotFound, navigate]);

  return (
    <ScrollContainer
      className='characters-list'
      scrollTop={scrollTop}
      onScrollTopChanged={handleScrollTopChange}
      onBottomReached={handleBottomReach}
    >
      <div className='img-title'></div>
      <div className='list'>
        <CharacterFilter
          className='list__filter'
          query={searchQuery}
          onQueryChange={changeQuery}
        />
        {!list?.length && isLoading ? (
          <Indicator
            className='list__indicator'
            size={Size.LARGE}
            title={t('list.progress', 'Loading characters...')}
          />
        ) : (
          <section className='list__content'>
            {list?.map((character) => (
              <CharacterCard
                key={character.id}
                className='list__item'
                data={character}
                onOpen={handleOpen}
                onChange={listQuery.updateItemInCache}
              />
            ))}
            {isLoading && (
              <div className='list__indicator'>
                <Indicator size={Size.SMALL} />
              </div>
            )}
          </section>
        )}
      </div>
    </ScrollContainer>
  );
};
