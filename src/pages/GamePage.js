import React from 'react';
import Timetable from '../components/Timetable/Timetable';

const GamePage = ({ activePlayers }) => {
  return (
    <div>
      <Timetable activePlayers={activePlayers} />
    </div>
  );
};

export default GamePage;