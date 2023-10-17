import React, { useState, useEffect } from 'react';
import './Timetable.css';
import TriviaBox from '../TriviaBox/TriviaBox';

const Timetable = ({ activePlayers }) => {
  const classes = ['Sports', 'General', 'History', 'Geography', 'Science', 'Theatre'];
  const [classOrders, setClassOrders] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showTriviaBox, setShowTriviaBox] = useState(false);

  useEffect(() => {
    // Create random class orders for each player
    const randomOrders = activePlayers.map(() => shuffleArray(classes));
    setClassOrders(randomOrders);
  }, [activePlayers]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleAttendClassClick = (className) => {
    setSelectedClass(className);
    setShowTriviaBox(true);
  };

  return (
    <div className="timetable-container">
      <div className="timetables">
        {activePlayers.map((player, index) => (
          <div key={player.id} className={`timetable ${index !== activePlayers.length - 1 ? 'timetable-divider' : ''}`}>
            <h3>{player.name}'s Timetable</h3>
            <ul>
              {classOrders[index] && classOrders[index].map((className, classIndex) => (
                <li key={classIndex}>{className}</li>
              ))}
            </ul>
            {showTriviaBox ? null : ( // Conditionally render the button when showTriviaBox is false
              <div className="center-button">
                <button onClick={() => handleAttendClassClick(classOrders[index] && classOrders[index][0])}>Attend class</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {showTriviaBox && selectedClass && <TriviaBox category={selectedClass} />}
    </div>
  );
};

export default Timetable;