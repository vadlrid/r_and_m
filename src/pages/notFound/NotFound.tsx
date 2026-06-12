import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import './NotFound.scss';

export const NotFound = () => {
  const navigate = useNavigate();

  const openMain = useCallback(() => navigate('/'), [navigate]);

  return (
    <section className='not-found'>
      <div className='img-title'></div>
      <button type='button' className='btn-main' onClick={openMain}>
        Go to main page
      </button>
    </section>
  );
};
