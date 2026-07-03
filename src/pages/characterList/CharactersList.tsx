import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Indicator } from '@components/indicator';
import { ScrollContainer } from '@components/scrollContainer';
import { CharacterCard } from '@widgets/characterCard';
import { CharacterFilter } from '@widgets/characterFilter';
import type { Character, CharacterSearchQuery } from '@shared/domain';
import { Size } from '@shared/types';
import {
  changeQuery,
  loadMore,
  setScrollTop,
  updateCharacter
} from '@store/characters';
import { useAppDispatch, useAppSelector } from '@store/root';
import './CharactersList.scss';

export const CharactersList = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const scrollTop = useAppSelector(({ characters }) => characters.scrollTop);
  const query = useAppSelector(({ characters }) => characters.query);
  const list = useAppSelector(({ characters }) => characters.list);
  const isLoading = useAppSelector(({ characters }) => characters.isLoading);
  const canNext = useAppSelector(({ characters }) => characters.canNext);
  const isSuccess = useAppSelector(({ characters }) => characters.isSuccess);
  const notFound = useAppSelector(({ characters }) => characters.notFound);
  const isFirstLoad = useAppSelector(
    ({ characters }) => characters.isFirstLoad
  );

  const handleOpen = (character: Character) =>
    navigate(`/info/${character.id}`);
  const handleChange = (character: Character) =>
    dispatch(updateCharacter(character));
  const handleScrollTopChange = (scrollTop: number) =>
    dispatch(setScrollTop(scrollTop));

  const handleBottomReach = () => {
    if (isLoading || !canNext || !isSuccess) {
      return;
    }
    dispatch(loadMore());
  };

  const handleQueryChange = (query: CharacterSearchQuery) => {
    dispatch(changeQuery(query));
  };

  // Вызов первой загрузки
  useEffect(() => {
    if (isFirstLoad) {
      dispatch(changeQuery({}));
    }
  }, [dispatch, isFirstLoad]);

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
          onQueryChange={handleQueryChange}
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
