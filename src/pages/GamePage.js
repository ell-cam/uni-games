import React from 'react';
import TriviaBox from '../components/TriviaBox/TriviaBox';
import Timetable from '../components/Timetable/Timetable';

const GamePage = ({ activePlayers }) => {
  return (
    <div>
      <Timetable activePlayers={activePlayers} />
      <TriviaBox category="Sports" />
    </div>
  );
};

export default GamePage;