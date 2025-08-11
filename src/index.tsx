import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './i18n';
import { Analytics } from '@vercel/analytics/react';

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <LanguageProvider>
    <BrowserRouter>
      <App />
      <Analytics />
    </BrowserRouter>
  </LanguageProvider>
);
