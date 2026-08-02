import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import './NotFound.scss';

export const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const openMain = useCallback(() => navigate('/'), [navigate]);

  return (
    <section className='not-found'>
      <div className='img-title'></div>
      <button type='button' className='btn-main' onClick={openMain}>
        {t('common.goMain', 'Go to main page')}
      </button>
    </section>
  );
};
