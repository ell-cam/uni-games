import React, { useState, useEffect } from "react";
import "./TriviaBox.css";

const TriviaBox = ({ category }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(null);
  const [countdown, setCountdown] = useState(15);
  const [answerClicked, setAnswerClicked] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);


  // Fetch a new question when game starts and when the current question is answered
  useEffect(() => {
    if (
      gameStarted &&
      (currentQuestion === null)
    ) {
      fetchNewQuestion();
    }
  }, [gameStarted, currentQuestion, answerIsCorrect]);

  useEffect(() => {
    fetch("https://opentdb.com/api_token.php?command=request")
      .then((response) => response.json())
      .then((data) => {
        setSessionToken(data.token);
      })
      .catch((error) => {
        console.error("Error fetching session token:", error);
      });
  }, []);

  const handleBeginClick = () => {
    setGameStarted(true);
  };

  const startCountdown = () => {
    const intervalId = setInterval(() => {
      if (countdown > 0 && !answerClicked) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      } else {
        clearInterval(intervalId);
        // Timer reached 0 or an answer was clicked
      }
    }, 1000);
  
    return intervalId;
  };

  useEffect(() => {
    if (gameStarted && !isGameOver) {
      const intervalId = startCountdown();
  
      // Clean up the interval when the game ends or an answer is clicked
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [gameStarted, isGameOver, answerClicked]);
  

  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
    return formattedTime;
  };

  const handleOptionClick = (option) => {
    if (answerIsCorrect !== null) {
      // User has already answered, don't process further clicks
      return;
    }
  
    setAnswerClicked(true); // Stop the timer
    setSelectedOption(option);
  
    if (option === currentQuestion.correct_answer) {
      // User answered correctly
      setAnswerIsCorrect(true);
      console.log("Correct!");
    } else {
      // User answered incorrectly
      setAnswerIsCorrect(false);
      console.log("Wrong!");
    }
  };  

  const fetchNewQuestion = () => {
    setSelectedOption(null);
    setAnswerIsCorrect(null);
    // Fetch questions from the API URL
    let apiURL = "https://opentdb.com/api.php?amount=1";

    const categoryMapping = {
      General: 9,
      Theatre: [10, 11, 12, 13, 14, 15, 16, 26],
      Science: [17, 18, 19, 27],
      Sports: 21,
      Geography: 22,
      History: 23,
    };

    let selectedCategory;

    switch (category) {
      default:
      case "General":
        selectedCategory = categoryMapping["General"];
        break;
      case "Theatre":
        selectedCategory = categoryMapping["Theatre"];
        break;
      case "Science":
        selectedCategory = categoryMapping["Science"];
        break;
      case "Sports":
        selectedCategory = categoryMapping["Sports"];
        break;
      case "Geography":
        selectedCategory = categoryMapping["Geography"];
        break;
      case "History":
        selectedCategory = categoryMapping["History"];
        break;
    }

    apiURL += "&type=multiple";

    if (sessionToken) {
      apiURL += `&token=${sessionToken}`;
    }

    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.results.length > 0) {
          const options = [
            data.results[0].correct_answer,
            ...data.results[0].incorrect_answers,
          ];
          const shuffledOptions = shuffleArray(options);
          data.results[0].options = shuffledOptions;

          // Check if the question has been used before in this game
          if (!usedQuestions.includes(data.results[0].question)) {
            setCurrentQuestion(data.results[0]);
            // Add this question to the used questions list
            setUsedQuestions([...usedQuestions, data.results[0].question]);
          } else {
            fetchNewQuestion(); // Fetch a new question if this one has been used
          }
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className="trivia-container">
      {gameStarted ? (
        <div className="trivia-box">
          <div className="timer">Time: {countdown} seconds</div>
          {currentQuestion ? (
            <>
              <div className="question">{currentQuestion.question}</div>
              <div className="answer-options">
              {currentQuestion.options ? (
                currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`answer-option ${
                      selectedOption === option
                        ? option === currentQuestion.correct_answer
                          ? "correct"
                          : "incorrect"
                        : ""
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                  ))
                ) : (
                  <div>No options available</div>
                )}
              </div>
            </>
          ) : (
            <div>No question available</div>
          )}
        </div>
      ) : (
        <div>
          <div className="category-info">Attending {category} Class</div>
          <button onClick={handleBeginClick} className="start-button">
            Begin
          </button>
        </div>
      )}
    </div>
  );
};

export default TriviaBox;
