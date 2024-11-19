import React, { useEffect, useState } from "react";
import style from "./ProductDetail.module.css";
import { useChallenges } from "../../contexts/ChallengeProvider";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../../components/NotFound/NotFound";

const Challenge = () => {
  const { id } = useParams();
  const { challengeData, isLoading } = useChallenges();
  const [challenge, setChallenge] = useState(null);
  const navigate = useNavigate();
  if (challengeData) {
    console.log(challengeData);
  }

  useEffect(() => {
    const filteredChallenges = challengeData.filter(
      (challenge) => challenge._id === String(id)
    );

    if (filteredChallenges.length === 1) {
      const selectedChallenge = filteredChallenges[0];
      setChallenge(selectedChallenge);
    }
  }, [challengeData, id]);

  if (isLoading && !challengeData) return <Loader />;
  else if (!challenge) return <NotFound />;
  else
    return (
      <div>
        {challenge.name}
      </div>
    );
};

export default Challenge;
