import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';
import { Logo } from '@components/icons';
import { OptionsBar } from '@widgets/optionsBar';
import { classNames } from '@shared/utils';
import { useOptionsStore } from '@store/options';
import './App.scss';

const AUTHOR = 'dvladir';

export const App = () => {
  const { t } = useTranslation();
  const isDarkMode = useOptionsStore((state) => state.isDarkMode);

  return (
    <section className={classNames('app', { 'dark-mode': isDarkMode })}>
      <nav className='shadow side-bars'>
        <Logo />
        <OptionsBar />
      </nav>
      <main>
        <Outlet />
      </main>
      <footer className='shadow'>
        <h3>
          {t('common.madeBy', {
            author: AUTHOR,
            defaultValue: 'Made with love by {{author}}'
          })}
        </h3>
      </footer>
      <Toaster
        toastOptions={{ className: 'toast' }}
        position='bottom-right'
        reverseOrder={false}
      />
    </section>
  );
};
