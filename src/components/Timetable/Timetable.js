import React, { useState, useEffect } from "react";
import "./Timetable.css";
import TriviaBox from "../TriviaBox/TriviaBox";

const Timetable = ({ activePlayers }) => {
  const classes = [
    "Sports",
    "General",
    "History",
    "Geography",
    "Science",
    "Theatre",
  ];
  const [classOrders, setClassOrders] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showTriviaBox, setShowTriviaBox] = useState(false);
  const [playerAnswers, setPlayerAnswers] = useState(
    new Array(activePlayers.length).fill(false)
  ); // Initialize the state to track player answers
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null); // Initialize the selected player index

  useEffect(() => {
    // Create random class orders for each player
    const randomOrders = activePlayers.map(() => shuffleArray(classes));
    setClassOrders(randomOrders);
  }, [activePlayers]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const recordPlayerAnswer = (isCorrect) => {
    const updatedAnswers = [...playerAnswers];
    updatedAnswers[selectedPlayerIndex] = isCorrect;
    setPlayerAnswers(updatedAnswers);
  };

  const handleTriviaBoxClose = () => {
    setSelectedClass(null);
    setShowTriviaBox(false);
  };

  const handleAttendClassClick = (className, playerIndex) => {
    setSelectedClass(className);
    setShowTriviaBox(true);
    // Store the player index to track their answer
    setSelectedPlayerIndex(playerIndex);
  };

  return (
    <div className="timetable-container">
      <div className="timetables">
        {activePlayers.map((player, index) => (
          <div
            key={player.id}
            className={`timetable ${
              index !== activePlayers.length - 1 ? "timetable-divider" : ""
            }`}
          >
            <h3>{player.name}'s Timetable</h3>
            <ul>
              {classOrders[index] &&
                classOrders[index].map((className, classIndex) => (
                  <li key={classIndex}>{className}</li>
                ))}
            </ul>
            <div className="center-button">
              <button
                onClick={() =>
                  handleAttendClassClick(
                    classOrders[index] && classOrders[index][0]
                  )
                }
              >
                Attend class
              </button>
            </div>
          </div>
        ))}
      </div>
      {showTriviaBox && selectedClass && (
        <TriviaBox
          category={selectedClass}
          recordPlayerAnswer={recordPlayerAnswer}
          onClose={handleTriviaBoxClose}
        />
      )}
    </div>
  );
};

export default Timetable;
