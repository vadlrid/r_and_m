import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { isNaN } from 'formik';
import { AxiosError, HttpStatusCode } from 'axios';
import { ArrowBack } from '@components/icons';
import { Indicator } from '@components/indicator';
import { useCharacterInfo } from '@shared/queries';
import './CharacterInfo.scss';
import { CharacterInfoField } from './CharacterInfoField';

export const CharacterInfo = () => {
  const navigate = useNavigate();

  const { cid } = useParams();
  let characterId = Number(cid);
  characterId = isNaN(characterId) ? -1 : characterId;

  const characterQuery = useCharacterInfo(characterId);

  const character = characterQuery.isError ? undefined : characterQuery.data;

  const isNotFound =
    characterQuery.isError &&
    characterQuery.error instanceof AxiosError &&
    characterQuery.error.status === HttpStatusCode.NotFound;

  const openNotFound = useCallback(() => {
    navigate('/404');
  }, [navigate]);

  useEffect(() => {
    if (isNotFound) {
      openNotFound();
    }
  }, [isNotFound, openNotFound]);

  return (
    <div className='side-bars'>
      <div className='character-info'>
        <button type='button' className='back' onClick={() => navigate(-1)}>
          <ArrowBack />
          <h3>GO BACK</h3>
        </button>
        {characterQuery.isPending && (
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
