import React, { useState } from 'react';
import './HomePage.css'; // Import the CSS file
import StartMenu from '../../components/StartMenu/StartMenu.js';
import PlayerSetup from '../../components/PlayerSetup/PlayerSetup.js';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ setActivePlayers }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();

  const navigateToGamePage = () => {
    navigate('/game');
  };

  // Function to handle the start button click
  const handleStartButtonClick = () => {
    setGameStarted(true);
  };

  return (
    <div className="home-page">
      <img src="/assets/logo.png" alt="Game Logo" />

      {gameStarted ? (
        <PlayerSetup onGameStart={(activePlayers) => {
          setActivePlayers(activePlayers); // Update activePlayers data
          navigateToGamePage();
        }} />
      ) : (
        <StartMenu onStartClick={handleStartButtonClick} />
      )}
    </div>
  );
};

export default HomePage;