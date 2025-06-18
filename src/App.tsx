import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="*" element={<MainPage/>}/>
      </Routes>
    </div>
  );
};

export default App;
