import { useNavigate } from 'react-router';
import { ArrowBack } from '@components/icons';
import { Indicator } from '@components/indicator';
import { Size } from '@shared/types';
import { ControlsExample } from '../controlsExample/ControlsExample.tsx';
import './CharacterInfo.scss';

export const CharacterInfo = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className='character-info side-bars'>
        <button type='button' className='back' onClick={() => navigate(-1)}>
          <ArrowBack />
          <h3>GO BACK</h3>
        </button>
        {/*todo: Индикатор добавлен для примера. Не забыть убрать*/}
        <Indicator size={Size.SMALL} />
        {/*todo: Страница с селектами для примера. Убрать*/}
        <ControlsExample />
      </section>
    </>
  );
};
