import React, { useState, useEffect } from "react";
import "./TriviaBox.css";

const TriviaBox = ({ category }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameStarted, setGameStarted] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(null);
  const [showGoText, setShowGoText] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);

  useEffect(() => {
    fetchSessionToken();
  }, []);

  useEffect(() => {
    if (gameStarted && !currentQuestion) {
      fetchNewQuestion();
    }
  }, [gameStarted]);

  useEffect(() => {
    if (timeLeft === 0 && gameStarted) {
      setShowGoText(true);
      setShowQuestion(false);
    }
  }, [timeLeft, gameStarted]);

  const fetchSessionToken = () => {
    fetch("https://opentdb.com/api_token.php?command=request")
      .then((response) => response.json())
      .then((data) => {
        setSessionToken(data.token);
      })
      .catch((error) => {
        console.error("Error fetching session token:", error);
      });
  };

  const handleBeginClick = () => {
    setGameStarted(true);
  };

  const handleOptionClick = (option) => {
    if (answerIsCorrect !== null) {
      // User has already answered, don't process further clicks
      return;
    }

    clearTimeout(timeLeft);

    if (option === currentQuestion.correct_answer) {
      // User answered correctly
      setAnswerIsCorrect(true);
    } else {
      // User answered incorrectly
      setAnswerIsCorrect(false);
    }

    setShowGoText(true);
    setShowQuestion(false);
  };

  const fetchNewQuestion = () => {
    setSelectedOption(null);
    setAnswerIsCorrect(null);

    // Fetch questions from the API URL
    let apiURL = "https://opentdb.com/api.php?amount=1";

    const categoryMapping = {
      "General Knowledge": 9,
      Entertainment: [10, 11, 12, 13, 14, 15, 16, 26],
      Science: [17, 18, 19, 27],
      Sports: 21,
      Geography: 22,
      History: 23,
    };

    let selectedCategory;

    switch (category) {
      default:
      case "General Knowledge":
        selectedCategory = categoryMapping["General Knowledge"];
        break;
      case "Entertainment":
        selectedCategory =
          categoryMapping["Entertainment"][
            Math.floor(Math.random() * categoryMapping["Entertainment"].length)
          ];
        break;
      case "Science":
        selectedCategory =
          categoryMapping["Science"][
            Math.floor(Math.random() * categoryMapping["Science"].length)
          ];
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

    apiURL += `&category=${selectedCategory}`;
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
          <div className="timer">Time Left: {timeLeft} seconds</div>
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
                            ? answerIsCorrect
                              ? "correct"
                              : "incorrect"
                            : ""
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
              {showGoText && (
                <div
                  className={`go-text ${
                    answerIsCorrect ? "go-forward" : "go-back"
                  }`}
                >
                  {answerIsCorrect ? "Go Forward" : "Go Back"}
                </div>
              )}
            </>
          ) : (
            <div>No question available</div>
          )}
        </div>
      ) : (
        <button onClick={handleBeginClick} className="start-button">
          Begin
        </button>
      )}
    </div>
  );
};

export default TriviaBox;