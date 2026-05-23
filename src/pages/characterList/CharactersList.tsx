import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CharacterCard } from '@widgets/characterCard';
import { CharacterFilter } from '@widgets/characterFilter';
import {
  type Character,
  type CharacterSearchQuery,
  Gender,
  Species,
  Status
} from '@shared/domain';
import './CharactersList.scss';

const MOCK_CHARACTER: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: Status.ALIVE,
  species: Species.HUMAN,
  gender: Gender.MALE,
  location: 'Earth',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
};

export const CharactersList = () => {
  const navigate = useNavigate();

  const handleOpen = (character: Character) =>
    navigate(`/info/${character.id}`);

  const [query, setQuery] = useState<CharacterSearchQuery>({});

  return (
    <>
      <section className='characters-list'>
        {/*todo: Переход на страницу с детальной информацией по клику на лого, пока нет полноценного списка. Потом удалить его*/}
        <div className='img-title' onClick={() => navigate('/info/1')}></div>
        <div className='list'>
          <CharacterFilter
            className='list__filter'
            query={query}
            onQueryChange={(newQuery) => setQuery(newQuery)}
          />
          <section className='list__items'>
            <CharacterCard
              className='list__items__item'
              data={MOCK_CHARACTER}
              onOpen={handleOpen}
            />
            <CharacterCard
              className='list__items__item'
              data={MOCK_CHARACTER}
              onOpen={handleOpen}
            />
            <CharacterCard
              className='list__items__item'
              data={MOCK_CHARACTER}
              onOpen={handleOpen}
            />
            <CharacterCard
              className='list__items__item'
              data={MOCK_CHARACTER}
              onOpen={handleOpen}
            />
            <CharacterCard
              className='list__items__item'
              data={MOCK_CHARACTER}
              onOpen={handleOpen}
            />
            <CharacterCard
              className='list__items__item'
              data={MOCK_CHARACTER}
              onOpen={handleOpen}
            />
          </section>
        </div>
      </section>
    </>
  );
};
