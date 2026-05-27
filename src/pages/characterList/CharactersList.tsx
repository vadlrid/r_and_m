import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Indicator } from '@components/indicator';
import { CharacterCard } from '@widgets/characterCard';
import { CharacterFilter } from '@widgets/characterFilter';
import type { Character, CharacterSearchQuery } from '@shared/domain';
import { Size } from '@shared/types';
import { useQueryCharacters } from '../../shared/apiHooks';
import './CharactersList.scss';

export const CharactersList = () => {
  const navigate = useNavigate();

  const handleOpen = (character: Character) =>
    navigate(`/info/${character.id}`);

  const [query, setQuery] = useState<CharacterSearchQuery>({});

  const { queryCharacters, data, isLoading } = useQueryCharacters();

  useEffect(() => {
    queryCharacters(query);
  }, [query, queryCharacters]);

  return (
    <>
      <section className='characters-list'>
        <div className='img-title'></div>
        <div className='list'>
          <CharacterFilter
            className='list__filter'
            query={query}
            onQueryChange={(newQuery) => setQuery(newQuery)}
          />
          {isLoading ? (
            <Indicator
              className='list__indicator'
              size={Size.LARGE}
              title='Loading characters...'
            />
          ) : (
            <section className='list__items'>
              {data?.results?.map((character) => (
                <CharacterCard
                  key={character.id}
                  className='list__items__item'
                  data={character}
                  onOpen={handleOpen}
                />
              ))}
            </section>
          )}
        </div>
      </section>
    </>
  );
};
