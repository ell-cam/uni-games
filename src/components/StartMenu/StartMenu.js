import React from 'react';
import { Link } from 'react-router-dom';
import './StartMenu.css'; // Import the CSS file

const StartMenu = () => {
  return (
    <div className="start-menu">
      <h2>Welcome to the Game</h2>
      <img src="your-image-url.jpg" alt="Game Logo" />
      <div className="button-container">
        <Link to="/game" className="start-button">
          Start
        </Link>
        <button className="menu-button">Menu</button>
        <button className="instruction-button">Help</button>
      </div>
    </div>
  );
};

export default StartMenu;