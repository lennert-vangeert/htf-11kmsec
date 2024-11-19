import React, { useEffect, useState } from "react";
import { useChallenges } from "../../contexts/ChallengeProvider";

const Home = () => {
  const [scoreBoard, setScoreBoard] = useState([]);
  const { challengeData } = useChallenges();

  // fetch scoreBoard
  const fetchScoreBoard = async () => {
    setIsLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/scoreboard`)
      .then((response) => response.json())
      .then((data) => setScoreBoard(data))
      .catch((err) => setErrors(err));
  };

  useEffect(() => {
    fetchScoreBoard();
  }, []);

  return <div></div>;
};

export default Home;
