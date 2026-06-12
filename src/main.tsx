import '@fontsource/karla/index.css';
import '@fontsource/roboto/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ApiProvider } from '@components/apiProvider';
import { ErrorBoundary } from '@components/errorBoundary';
import { App } from './App.tsx';
import { API_BASE_URL, REQUEST_ATTEMPTS } from './config';
import './index.scss';
import { CharacterInfo } from './pages/characterInfo';
import {
  CharactersList,
  CharactersListStateProvider
} from './pages/characterList';
import { NotFound } from './pages/notFound';

const APP_BASE_URL = import.meta.env.BASE_URL;

// Обработка редиректа
const params = new URLSearchParams(window.location.search);
const redirect = params.get('redirect');
if (redirect) {
  window.history.replaceState(null, '', APP_BASE_URL + redirect);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={() => (
        <h1 className='global-error'>Oops! Something goes wrong...</h1>
      )}
    >
      <ApiProvider baseUrl={API_BASE_URL} maxAttempts={REQUEST_ATTEMPTS}>
        <CharactersListStateProvider>
          <BrowserRouter basename={APP_BASE_URL}>
            <Routes>
              <Route path='/' element={<App />}>
                <Route index element={<CharactersList />} />
                <Route path='info/:cid' element={<CharacterInfo />} />
                <Route path='*' element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CharactersListStateProvider>
      </ApiProvider>
    </ErrorBoundary>
  </StrictMode>
);
