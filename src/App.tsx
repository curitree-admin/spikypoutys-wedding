import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { Analytics } from '@vercel/analytics/next';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Analytics />
      </Routes>
    </div>
  );
};

export default App;
