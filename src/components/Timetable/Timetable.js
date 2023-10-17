import React, { useState, useEffect } from 'react';
import './Timetable.css'; // Import the CSS file for styling

const Timetable = ({ activePlayers }) => {
  const classes = ['Sports', 'General', 'History', 'Geography', 'Science', 'Theatre'];
  const [classOrder, setClassOrder] = useState([]);

  useEffect(() => {
    // Shuffle the classes array to randomize the order
    const shuffledClasses = shuffleArray(classes);
    setClassOrder(shuffledClasses);
  }, []);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <div className="timetable-container">
      <div className="timetables">
        {activePlayers.map((player, index) => (
          <div key={player.id} className={`timetable ${index !== activePlayers.length - 1 ? 'timetable-divider' : ''}`}>
            <h3>{player.name}'s Timetable</h3>
            <ul>
              {classOrder.map((className, index) => (
                <li key={index}>{className}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;