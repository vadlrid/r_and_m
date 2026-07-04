import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Indicator } from '@components/indicator';
import { ScrollContainer } from '@components/scrollContainer';
import { CharacterCard } from '@widgets/characterCard';
import { CharacterFilter } from '@widgets/characterFilter';
import type { Character } from '@shared/domain';
import { Size } from '@shared/types';
import { useCharactersStore } from '@store/characters';
import './CharactersList.scss';

export const CharactersList = () => {
  const navigate = useNavigate();

  const scrollTop = useCharactersStore((state) => state.scrollTop);
  const query = useCharactersStore((state) => state.query);
  const list = useCharactersStore((state) => state.list);
  const isLoading = useCharactersStore((state) => state.isLoading);
  const canNext = useCharactersStore((state) => state.canNext);
  const isSuccess = useCharactersStore((state) => state.isSuccess);
  const notFound = useCharactersStore((state) => state.notFound);
  const isFirstLoad = useCharactersStore((state) => state.isFirstLoad);

  const handleOpen = (character: Character) =>
    navigate(`/info/${character.id}`);
  const handleChange = useCharactersStore((state) => state.updateCharacter);
  const handleScrollTopChange = useCharactersStore(
    (state) => state.setScrollTop
  );
  const loadMore = useCharactersStore((state) => state.loadMore);
  const changeQuery = useCharactersStore((state) => state.changeQuery);

  const handleBottomReach = () => {
    if (isLoading || !canNext || !isSuccess) {
      return;
    }
    loadMore();
  };

  // Вызов первой загрузки
  useEffect(() => {
    if (isFirstLoad) {
      changeQuery({});
    }
  }, [changeQuery, isFirstLoad]);

  useEffect(() => {
    if (notFound) {
      navigate('/404');
    }
  }, [notFound, navigate]);

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
          query={query}
          onQueryChange={changeQuery}
        />
        {!list?.length && isLoading ? (
          <Indicator
            className='list__indicator'
            size={Size.LARGE}
            title='Loading characters...'
          />
        ) : (
          <section className='list__content'>
            {list?.map((character) => (
              <CharacterCard
                key={character.id}
                className='list__item'
                data={character}
                onOpen={handleOpen}
                onChange={handleChange}
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
