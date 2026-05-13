import './CharacterInfo.css';
import { ArrowBack } from '@components/icons';
import { useNavigate } from 'react-router';
import { Indicator, IndicatorSize } from '@components/indicator';

export const CharacterInfo = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className='character-info'>
        <button type='button' className='back' onClick={() => navigate(-1)}>
          <ArrowBack />
          <h3>GO BACK</h3>
        </button>
        {/*todo: Индикатор добавлен для примера. Не забыть убрать*/}
        <Indicator size={IndicatorSize.SMALL} />
      </section>
    </>
  );
};
