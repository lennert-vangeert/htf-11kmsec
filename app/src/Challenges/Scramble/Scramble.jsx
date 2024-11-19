import React, { useState, useEffect } from "react";
import style from "./Scramble.module.css";

// Space theme word list
const spaceWords = [
  "planet",
  "galaxy",
  "astronaut",
  "rocket",
  "comet",
  "nebula",
  "star",
  "telescope",
  "universe",
  "gravity",
  "asteroid",
  "orbit",
  "satellite",
  "constellation",
  "solar",
  "moon",
  "spacecraft",
  "alien",
  "blackhole",
  "meteor",
  "saturn",
  "jupiter",
  "mars",
  "milkyway",
  "eclipse",
  "aurora",
  "exoplanet",
  "voyager",
  "spacetime",
  "lightyear",
];

// Function to scramble a word
const scrambleWord = (word) => {
  const scrambled = word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
  return scrambled;
};

const Scramble = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const startNewRound = () => {
    const randomWord =
      spaceWords[Math.floor(Math.random() * spaceWords.length)];
    const scrambled = scrambleWord(randomWord);
    setCurrentWord(randomWord);
    setScrambledWord(scrambled);
    setGuess("");
    setAttempts(0);
    setIsGameOver(false);
  };

  const setScoreBoard = () => {
    fetch(`${import.meta.env.VITE_API_URL}/scoreboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        userID: user._id,
        challengeId: "673c9b5b45af146fd83478df",
        score: score,
      }),
    });
  };

  const handleSubmit = () => {
    if (attempts < 3) {
      if (guess.toLowerCase() === currentWord.toLowerCase()) {
        const points = 3 - attempts;
        startNewRound();
        setScore((prevScore) => prevScore + points);
        setScoreBoard();
      } else {
        setAttempts(attempts + 1);
        if (attempts === 2) {
          startNewRound();
          setScore(0);
        }
      }
    }
  };

  useEffect(() => {
    startNewRound();
  }, []);

  return (
    <div className={style.main}>
      <h1 className={style.white}>Scrambled in Space</h1>
      <p className={style.white}>Guess the space-themed word!</p>
      <p className={style.white}>Scrambled Word: {scrambledWord}</p>
      <p className={style.white}>Attempts Left: {3 - attempts}</p>

      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={isGameOver}
        placeholder="Enter your guess"
      />
      <button onClick={handleSubmit} disabled={isGameOver}>
        Try
      </button>

      <p>Score: {score}</p>

      {isGameOver && (
        <div>
          <p>Game Over! Your final score is {score}</p>
          <button
            onClick={() => {
              setScore(0);
              startNewRound();
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Scramble;
