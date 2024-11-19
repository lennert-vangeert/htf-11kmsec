import React, { useEffect, useState } from "react";
import styles from "./Scoreboard.module.css"; // Import CSS module
import { useChallenges } from "../../contexts/ChallengeProvider";
import { useAuthContext } from "../../contexts/AuthContainer";

const ScoreBoard = () => {
  const [scoreBoard, setScoreBoard] = useState([]);
  const { challengeData } = useChallenges();
  const { user, setUser } = useAuthContext();

  const getUsers = async () => {
    fetch(`${import.meta.env.VITE_API_URL}/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((err) => setErrors(err));
  };

  if (challengeData) {
    console.log(challengeData);
  }

  const getChallengeName = (challengeId) => {
    const challenge = challengeData.find(
      (challenge) => challenge._id === challengeId
    );
    return challenge.name;
  };

  // fetch scoreBoard
  const fetchScoreBoard = async () => {
    fetch(`${import.meta.env.VITE_API_URL}/scoreboard`)
      .then((response) => response.json())
      .then((data) => setScoreBoard(data))
      .catch((err) => setErrors(err));
  };

  useEffect(() => {
    fetchScoreBoard();
    getUsers();
  }, []);
  

  if (scoreBoard.length > 0) {
    return (
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
                <td className={styles.td}>{user.firstName}</td>
                <td className={styles.td}>
                  {getChallengeName(score.challengeId)}
                </td>
                <td className={styles.td}>{score.score}</td>
                <td className={styles.td}>
                  {new Date(score.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {console.log(scoreBoard)}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ScoreBoard;
