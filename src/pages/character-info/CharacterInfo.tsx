import { useNavigate } from 'react-router';
import { ArrowBack } from '@components/icons';
import { Indicator } from '@components/indicator';
import { Size } from '@shared/types';
import { SelectExample } from '../select-example/SelectExample.tsx';
import './CharacterInfo.css';

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
        <Indicator size={Size.SMALL} />
        {/*todo: Страница с селектами для примера. Убрать*/}
        <SelectExample />
      </section>
    </>
  );
};
