import { useState, useEffect } from "react";
import "./ReactionSpeedChallenge.scss";

const Asteroid = ({ position, onClick }) => {
  return (
    <div
      className="asteroid"
      style={{ left: `${position.left}vw`, top: `${position.top}vh` }}
      onClick={onClick}
    />
  );
};

const ReactionSpeedChallenge = () => {
  const [asteroid, setAsteroid] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const generateAsteroid = () => {
    if (!gameOver) {
      setAsteroid({
        id: Math.random(),
        position: { left: Math.random() * 90, top: Math.random() * 80 },
      });
    }
  };

  useEffect(() => {
    let timerInterval;
    if (isStarted && !gameOver) {
      timerInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            clearInterval(timerInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isStarted, gameOver]);

  useEffect(() => {
    if (isStarted && !gameOver) {
      generateAsteroid();
    }
  }, [isStarted, gameOver]);

  const handleAsteroidClick = (id) => {
    if (asteroid && asteroid.id === id) {
      setAsteroid(null);
      setScore(score + 1);
      generateAsteroid();
    }
  };

  return (
    <div>
      {isStarted ? (
        <div className="game-container">
          {!gameOver ? (
            <>
              <div className="score-card">
                <p>Score: {score}</p>
                <p>Time Left: {timeLeft}s</p>
              </div>
              <div className="game-area">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
                {asteroid && (
                  <Asteroid
                    position={asteroid.position}
                    onClick={() => handleAsteroidClick(asteroid.id)}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="result">
              <h2>Time is up! Your Score: {score}</h2>
              <button onClick={() => setIsStarted(false)}>Play Again</button>
            </div>
          )}
        </div>
      ) : (
        <div className="intro-container">
          <h1>Reaction Speed Challenge</h1>
          <p>Click on asteroids as fast as you can before the timer runs out!</p>
          <button onClick={() => setIsStarted(true)}>Start</button>
        </div>
      )}
    </div>
  );
};

export default ReactionSpeedChallenge;
