import '@fontsource/karla/index.css';
import '@fontsource/roboto/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ApiProvider } from '@components/apiProvider';
import { ErrorBoundary } from '@components/errorBoundary';
import { App } from './App.tsx';
import { BASE_URL } from './config';
import './index.scss';
import { CharacterInfo } from './pages/characterInfo';
import {
  CharactersList,
  CharactersListStateProvider
} from './pages/characterList';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={() => (
        <h1 className='global-error'>Oops! Something goes wrong...</h1>
      )}
    >
      <ApiProvider baseUrl={BASE_URL}>
        <CharactersListStateProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<App />}>
                <Route index element={<CharactersList />} />
                <Route path='info/:cid' element={<CharacterInfo />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CharactersListStateProvider>
      </ApiProvider>
    </ErrorBoundary>
  </StrictMode>
);
