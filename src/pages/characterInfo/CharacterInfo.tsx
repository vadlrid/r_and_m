import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowBack } from '@components/icons';
import { Indicator } from '@components/indicator';
import { useCharacterInfoStore } from '@store/characterInfo';
import './CharacterInfo.scss';
import { CharacterInfoField } from './CharacterInfoField';

export const CharacterInfo = () => {
  const navigate = useNavigate();

  const isLoading = useCharacterInfoStore((state) => state.isLoading);
  const character = useCharacterInfoStore((state) => state.character);
  const notFound = useCharacterInfoStore((state) => state.notFound);
  const getCharacter = useCharacterInfoStore((state) => state.getCharacter);
  const abortGetCharacter = useCharacterInfoStore(
    (state) => state.abortGetCharacter
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

    getCharacter(characterId);
    return () => abortGetCharacter();
  }, [notFound, characterId, openNotFound, getCharacter, abortGetCharacter]);

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
