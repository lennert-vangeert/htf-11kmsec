import React, { useEffect, useState } from "react";
import styles from "./Scoreboard.module.css"; // Import CSS module
import { useChallenges } from "../../contexts/ChallengeProvider";

const ScoreBoard = () => {
  const [scoreBoard, setScoreBoard] = useState([]);
  const { challengeData } = useChallenges();

  if (challengeData) {
    console.log(challengeData);
  }

  // fetch scoreBoard
  const fetchScoreBoard = async () => {
    fetch(`${import.meta.env.VITE_API_URL}/scoreboard`)
      .then((response) => response.json())
      .then((data) => setScoreBoard(data))
      .catch((err) => setErrors(err));
  };

  useEffect(() => {
    fetchScoreBoard();
  }, []);

  if (scoreBoard.length > 0) {
    console.log(scoreBoard);
  }

  if (scoreBoard.length > 0) return (
      <div className={styles.tableContainer}>
        <table className={styles.scoreboardTable}>
          <thead className={styles.header}>
            <tr>
              <th className={styles.th}>User</th>
              <th className={styles.th}>Challenge</th>
              <th className={styles.th}>Score</th>
              <th className={styles.th}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {scoreBoard.map((score, index) => (
              <tr
                key={score._id}
                className={index % 2 === 0 ? styles.trEven : styles.trOdd}
                onMouseEnter={(e) =>
                  (e.currentTarget.className = styles.rowHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.className =
                    index % 2 === 0 ? styles.trEven : styles.trOdd)
                }
              >
                <td className={styles.td}>{scoreBoard.userId}</td>
                <td className={styles.td}>{scoreBoard.challengeId}</td>
                <td className={styles.td}>{scoreBoard.score}</td>
                <td className={styles.td}>
                  {new Date(score.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default ScoreBoard;
