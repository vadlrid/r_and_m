import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/karla/index.css';
import './index.css';
import { App } from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { CharactersList } from './pages/character-list';
import { CharacterInfo } from './pages/character-info';

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
