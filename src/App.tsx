import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';
import { Logo } from '@components/icons';
import { OptionsBar } from '@components/optionsBar';
import { ThemeContext } from '@components/themeProvider';
import { classNames } from '@shared/utils';
import './App.scss';

const AUTHOR = 'dvladir';

export const App = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <section
      className={classNames('app', { 'dark-mode': themeContext?.isDarkMode })}
    >
      <nav className='shadow side-bars'>
        <Logo />
        <OptionsBar />
      </nav>
      <main>
        <Outlet />
      </main>
      <footer className='shadow'>
        <h3>Made with love by {AUTHOR}</h3>
      </footer>
      <Toaster
        toastOptions={{ className: 'toast' }}
        position='bottom-right'
        reverseOrder={false}
      />
    </section>
  );
};
