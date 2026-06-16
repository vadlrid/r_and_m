import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { type AxiosError, HttpStatusCode } from 'axios';
import { ArrowBack } from '@components/icons';
import { Indicator } from '@components/indicator';
import { useGetCharacter } from '@shared/apiHooks';
import type { Character } from '@shared/domain';
import './CharacterInfo.scss';
import { CharacterInfoField } from './CharacterInfoField';

export const CharacterInfo = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState<Character | undefined>(undefined);

  const { cid } = useParams();
  const characterId = Number(cid);

  const openNotFound = useCallback(() => {
    navigate('/404');
  }, [navigate]);

  const handleNotFound = useCallback(
    (error: AxiosError) => {
      if (error.status === HttpStatusCode.NotFound) {
        openNotFound();
        return true;
      }
      return false;
    },
    [openNotFound]
  );

  const getCharacter = useGetCharacter(characterId, handleNotFound);

  useEffect(() => {
    let isIgnore = false;
    if (!isNaN(characterId)) {
      getCharacter().then((response) => {
        if (isIgnore) {
          return;
        }
        setIsLoading(false);
        setCharacter(response);
      });
    } else {
      openNotFound();
    }
    return () => {
      isIgnore = true;
    };
  }, [getCharacter, characterId, openNotFound]);

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
