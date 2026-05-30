import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Indicator } from '@components/indicator';
import { ScrollContainer } from '@components/scrollContainer';
import { CharacterCard } from '@widgets/characterCard';
import { CharacterFilter } from '@widgets/characterFilter';
import type { Character } from '@shared/domain';
import { Size } from '@shared/types';
import './CharactersList.scss';
import { CharactersListStateContext } from './CharactersListStateContext';

export const CharactersList = () => {
  const navigate = useNavigate();

  const handleOpen = (character: Character) =>
    navigate(`/info/${character.id}`);

  const context = useContext(CharactersListStateContext);

  return (
    <ScrollContainer
      className='characters-list'
      scrollTop={context?.scrollTop}
      onScrollTopChanged={(value) => context?.changeScrollTop(value)}
      onBottomReached={() => context?.loadMore()}
    >
      <div className='img-title'></div>
      <div className='list'>
        <CharacterFilter
          className='list__filter'
          query={context?.query}
          onQueryChange={(newQuery) => context?.changeQuery(newQuery)}
        />
        {!context?.list?.length && context?.isLoading ? (
          <Indicator
            className='list__indicator'
            size={Size.LARGE}
            title='Loading characters...'
          />
        ) : (
          <section className='list__items'>
            {context?.list?.map((character) => (
              <CharacterCard
                key={character.id}
                className='list__items__item'
                data={character}
                onOpen={handleOpen}
              />
            ))}
            {context?.isLoading && (
              <div className='list__items__loading-bar'>
                <Indicator size={Size.SMALL} />
              </div>
            )}
          </section>
        )}
      </div>
    </ScrollContainer>
  );
};
