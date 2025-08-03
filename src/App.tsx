import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { useLanguage } from './i18n';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="*" element={<MainPage />} />
      </Routes>
    </div>
  );
};

export default App;
