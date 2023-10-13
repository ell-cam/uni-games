import React, { useState, useEffect } from "react";
import { getQuestion } from "/.../.../backend/app.py"
import "./TriviaBox.css";

const TriviaBox = ({ category }) => {
    const [question, setQuestion] = useState(null);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeLeft, setTimeLeft] = useState(10); // in seconds

    useEffect(() => {
        // fetch a random question from the database based on the category prop
        getQuestion(category).then((data) => {
            setQuestion(data.question);
            setOptions(data.options);
        });
    }, [category]);

    useEffect(() => {
        // start the timer
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        // clear the timer when timeLeft reaches 0
        if (timeLeft === 0) {
            clearInterval(timer);
        }

        // clean up the timer when the component unmounts
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div>
            <div>{question}</div>
            {options.map((option) => (
                <div
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    style={{ backgroundColor: selectedOption === option ? "green" : "white" }}
                >
                    {option}
                </div>
            ))}
            <div style={{ width: "100%", height: "10px", backgroundColor: "gray" }}>
                <div
                    style={{
                        width: `${(timeLeft / 10) * 100}%`,
                        height: "10px",
                        backgroundColor: "green",
                    }}
                />
            </div>
            {selectedOption && (
                <div>{selectedOption === options[0] ? "Correct!" : "Wrong!"}</div>
            )}
        </div>
    );
};

export default TriviaBox;
