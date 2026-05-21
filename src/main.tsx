import '@fontsource/karla/index.css';
import '@fontsource/roboto/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { App } from './App.tsx';
import './index.scss';
import { CharacterInfo } from './pages/characterInfo';
import { CharactersList } from './pages/characterList';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<CharactersList />} />
          <Route path='info/:cid' element={<CharacterInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
