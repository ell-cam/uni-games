import React from 'react';
import TriviaBox from '../components/TriviaBox/TriviaBox';

const GamePage = () => {
  return (
    <div>
      <h1>Game Board</h1>
      <TriviaBox category="general" />
    </div>
  );
};

export default GamePage;
