import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { useLanguage } from './i18n';

const App: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  return (
    <div>
      <button onClick={toggleLanguage} style={{ position: 'absolute', top: 10, right: 10 }}>
        {language === 'ko' ? 'English' : '한국어'}
      </button>
      <Routes>
        <Route path="*" element={<MainPage />} />
      </Routes>
    </div>
  );
};

export default App;
