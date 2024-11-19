import React, { useState, useEffect, useRef } from "react";
import "./SpaceInvaders.css";
import { useAuthContext } from "../../contexts/AuthContainer";

const COLUMN_COUNT = 10;
const ROW_COUNT = 60;

const SpaceInvaders = () => {
  const [playerPosition, setPlayerPosition] = useState(4); // Player starts in column 4
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { user, setUser } = useAuthContext();
  console.log(user);

  // Move player left or right
  const movePlayer = (direction) => {
    setPlayerPosition((pos) => {
      if (direction === "left" && pos > 0) return pos - 1;
      if (direction === "right" && pos < COLUMN_COUNT - 1) return pos + 1;
      return pos;
    });
  };

  useEffect(() => {
    if (gameOver) {
        // post score to database
        fetch(`${import.meta.env.VITE_API_URL}/scoreboard`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Space Invaders",
            score: score,
          }),
        });
    }
    }, [gameOver]);

  // Shoot a bullet
  const shoot = () => {
    setBullets((prev) => [
      ...prev,
      { column: playerPosition, row: ROW_COUNT - 1 },
    ]);
  };

  // Spawn new enemies
  const spawnEnemies = () => {
    const newEnemies = Array.from({ length: COLUMN_COUNT }, (_, i) => ({
      column: i,
      row: 0,
      active: Math.random() > 0.5, // Randomly spawn enemies in each column
    })).filter((enemy) => enemy.active);
    setEnemies((prev) => [...prev, ...newEnemies]);
  };

  // Move enemies down
  const moveEnemies = () => {
    setEnemies((prev) =>
      prev
        .map((enemy) => ({ ...enemy, row: enemy.row + 1 }))
        .filter((enemy) => {
          if (enemy.row >= ROW_COUNT) {
            setGameOver(true);
            return false;
          }
          return true;
        })
    );
  };

  // Move bullets up and check for collisions
  const moveBullets = () => {
    setBullets((prev) =>
      prev
        .map((bullet) => ({ ...bullet, row: bullet.row - 1 }))
        .filter((bullet) => bullet.row >= 0)
    );

    setEnemies((prevEnemies) => {
      const remainingEnemies = [];
      prevEnemies.forEach((enemy) => {
        const hitBulletIndex = bullets.findIndex(
          (bullet) => bullet.column === enemy.column && bullet.row === enemy.row
        );
        if (hitBulletIndex !== -1) {
          setScore((score) => score + 1);
          setBullets((prev) => prev.filter((_, i) => i !== hitBulletIndex)); // Remove the bullet
        } else {
          remainingEnemies.push(enemy);
        }
      });
      return remainingEnemies;
    });
  };

  // Key press handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      if (e.key === "ArrowLeft") movePlayer("left");
      if (e.key === "ArrowRight") movePlayer("right");
      if (e.key === "e") shoot();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver, playerPosition]);

  // Game loop
  useEffect(() => {
    if (gameOver) return;
    const enemyInterval = setInterval(moveEnemies, 150);
    const bulletInterval = setInterval(moveBullets, 200);

    return () => {
      clearInterval(enemyInterval);
      clearInterval(bulletInterval);
    };
  }, [gameOver, bullets]);

  // Enemy spawn timer
  useEffect(() => {
    if (gameOver) return;
    const spawnInterval = setInterval(spawnEnemies, 10000);
    spawnEnemies(); // Spawn initial enemies
    return () => clearInterval(spawnInterval);
  }, [gameOver]);

  return (
    <div className="space-invaders">
      <div className="game-board">
        {[...Array(ROW_COUNT)].map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {[...Array(COLUMN_COUNT)].map((_, columnIndex) => {
              const isPlayer =
                rowIndex === ROW_COUNT - 1 && columnIndex === playerPosition;
              const isBullet = bullets.some(
                (bullet) =>
                  bullet.row === rowIndex && bullet.column === columnIndex
              );
              const isEnemy = enemies.some(
                (enemy) =>
                  enemy.row === rowIndex && enemy.column === columnIndex
              );

              return (
                <div
                  key={columnIndex}
                  className={`cell ${
                    isPlayer
                      ? "player"
                      : isBullet
                      ? "bullet"
                      : isEnemy
                      ? "enemy"
                      : ""
                  }`}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="info">
        <p>Score: {score}</p>
        {gameOver && <p className="game-over">Game Over!</p>}
      </div>
    </div>
  );
};

export default SpaceInvaders;
