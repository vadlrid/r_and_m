import '@fontsource/karla/index.css';
import '@fontsource/roboto/index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ErrorBoundary } from '@components/errorBoundary';
import { queryClient } from '@shared/api';
import { App } from './App.tsx';
import './i18nSetup';
import { CharacterInfo } from './pages/characterInfo';
import { CharactersList } from './pages/characterList';
import { NotFound } from './pages/notFound';
import './styles/index.scss';

const APP_BASE_URL = import.meta.env.BASE_URL;

// Обработка редиректа
const params = new URLSearchParams(window.location.search);
const redirect = params.get('redirect');
if (redirect) {
  window.history.replaceState(null, '', APP_BASE_URL + redirect);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        FallbackComponent={() => {
          const { t } = useTranslation();
          return (
            <h1 className='global-error'>
              {t('common.globalError', 'Oops! Something goes wrong...')}
            </h1>
          );
        }}
      >
        <BrowserRouter basename={APP_BASE_URL}>
          <Routes>
            <Route path='/' element={<App />}>
              <Route index element={<CharactersList />} />
              <Route path='info/:cid' element={<CharacterInfo />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>
);
