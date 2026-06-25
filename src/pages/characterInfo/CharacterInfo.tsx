import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowBack } from '@components/icons';
import { Indicator } from '@components/indicator';
import { getCharacter } from '@store/characterInfo';
import { useAppDispatch, useAppSelector } from '@store/root';
import './CharacterInfo.scss';
import { CharacterInfoField } from './CharacterInfoField';

export const CharacterInfo = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    ({ characterInfo }) => characterInfo.isLoading
  );
  const character = useAppSelector(
    ({ characterInfo }) => characterInfo.character
  );
  const notFound = useAppSelector(
    ({ characterInfo }) => characterInfo.notFound
  );

  const { cid } = useParams();
  const characterId = Number(cid);

  const openNotFound = useCallback(() => {
    navigate('/404');
  }, [navigate]);

  useEffect(() => {
    if (isNaN(characterId) || notFound) {
      openNotFound();
      return;
    }

    const promise = dispatch(getCharacter(characterId));
    return () => promise.abort();
  }, [dispatch, notFound, characterId, openNotFound]);

  return (
    <div className='side-bars'>
      <div className='character-info'>
        <button type='button' className='back' onClick={() => navigate(-1)}>
          <ArrowBack />
          <h3>GO BACK</h3>
        </button>
        {isLoading && (
          <div className='character-info__progress'>
            <Indicator title='Loading character card...' />
          </div>
        )}
        {!!character && (
          <div className='character-info__content'>
            <img src={character.image} alt="Character's image" />
            <h2>{character.name}</h2>
            <h4>Information</h4>
            <section className='fields-form'>
              <CharacterInfoField label='Gender' value={character.gender} />
              <CharacterInfoField label='Status' value={character.status} />
              <CharacterInfoField label='Specie' value={character.species} />
              <CharacterInfoField label='Origin' value={character.origin} />
              <CharacterInfoField
                label='Type'
                value={character.type || 'Unknown'}
              />
              <CharacterInfoField label='Location' value={character.location} />
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
