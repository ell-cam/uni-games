import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import GamePage from './pages/GamePage';

function App() {
  const [activePlayers, setActivePlayers] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setActivePlayers={setActivePlayers} />} />
        <Route path="game" element={<GamePage activePlayers={activePlayers} />} />
      </Routes>
    </Router>
  );
}

export default App;