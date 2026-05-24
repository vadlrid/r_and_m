import '@fontsource/karla/index.css';
import '@fontsource/roboto/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ErrorBoundary } from '@components/errorBoundary';
import { App } from './App.tsx';
import './index.scss';
import { CharacterInfo } from './pages/characterInfo';
import { CharactersList } from './pages/characterList';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={() => (
        <h1 className='global-error'>Oops! Something goes wrong...</h1>
      )}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<CharactersList />} />
            <Route path='info/:cid' element={<CharacterInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
