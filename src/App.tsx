import { Outlet } from 'react-router';
import { Logo } from '@components/icons';
import './App.css';

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
    </>
  );
};
