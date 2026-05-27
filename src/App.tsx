import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';
import { Logo } from '@components/icons';
import './App.scss';

const AUTHOR = 'dvladir';

export const App = () => {
  return (
    <>
      <nav className='shadow side-bars'>
        <Logo />
      </nav>
      <main className='side-bars'>
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
    </>
  );
};
