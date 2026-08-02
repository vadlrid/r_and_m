import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { isNaN } from 'formik';
import { AxiosError, HttpStatusCode } from 'axios';
import { ArrowBack } from '@components/icons';
import { Indicator } from '@components/indicator';
import { useCharacterLabels } from '@shared/hooks';
import { useCharacterInfo } from '@shared/queries';
import './CharacterInfo.scss';
import { CharacterInfoField } from './CharacterInfoField';

export const CharacterInfo = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const { lblGender, lblSpecies, lblLocation, lblStatus, lblOrigin, lblType } =
    useCharacterLabels();

  return (
    <div className='side-bars'>
      <div className='character-info'>
        <button type='button' className='back' onClick={() => navigate(-1)}>
          <ArrowBack />
          <h3>{t('characterInfo.back', 'Go Back').toUpperCase()}</h3>
        </button>
        {characterQuery.isPending && (
          <div className='character-info__progress'>
            <Indicator
              title={t('characterInfo.progress', 'Loading character card...')}
            />
          </div>
        )}
        {!!character && (
          <div className='character-info__content'>
            <img
              src={character.image}
              alt={t('characterInfo.imgAlt', "Character's image")}
            />
            <h2>{character.name}</h2>
            <h4>{t('characterInfo.subtitle', 'Information')}</h4>
            <section className='fields-form'>
              <CharacterInfoField
                label={lblGender}
                value={t(`gender.${character.gender.toLowerCase()}`)}
              />
              <CharacterInfoField
                label={lblStatus}
                value={t(`status.${character.status.toLowerCase()}`)}
              />
              <CharacterInfoField
                label={lblSpecies}
                value={t(`species.${character.species.toLowerCase()}`)}
              />
              <CharacterInfoField label={lblOrigin} value={character.origin} />
              <CharacterInfoField
                label={lblType}
                value={character.type || t('characterInfo.unknown', 'Unknown')}
              />
              <CharacterInfoField
                label={lblLocation}
                value={character.location}
              />
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
