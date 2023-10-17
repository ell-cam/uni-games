import React from 'react';
import './StartMenu.css';

const StartMenu = ({ onStartClick }) => {
  return (
    <div className="start-menu">
      <h2>Race to graduate...</h2>
      <div className="button-container">
        <button onClick={onStartClick} className="start-button">
          Start
        </button>
        <button className="menu-button">Menu</button>
        <button className="instruction-button">Help</button>
      </div>
    </div>
  );
};

export default StartMenu;