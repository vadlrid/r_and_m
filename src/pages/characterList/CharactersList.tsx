import { useNavigate } from 'react-router';
import { Indicator } from '@components/indicator';
import './CharactersList.scss';

export const CharactersList = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className='characters-list'>
        {/*todo: Переход на страницу с детальной информацией по клику на лого, пока нет полноценного списка. Потом удалить его*/}
        <div className='img-title' onClick={() => navigate('/info/1')}></div>
        <Indicator title='Loading characters...' />
      </section>
    </>
  );
};
