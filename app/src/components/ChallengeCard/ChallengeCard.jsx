import React, { useState } from "react";
import style from "./ChallengeCard.module.css";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/ROUTES";

// {
// 	"_id": "673c5c097973c0a6295d5077",
// 	"name": "Asteroid destroyer",
// 	"description": "Train your reaction time by destroying asteroids",
// 	"image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffree-png-vectors%2Fasteroid&psig=AOvVaw3uZOeECGOrVI8vldkL1Lqw&ust=1732095150063000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLD619SL6IkDFQAAAAAdAAAAABAE",
// 	"difficulty": "medium",
// 	"category": "Mental",
// 	"tags": [
// 		"reaction time",
// 		"attention",
// 		"observation",
// 		"focus"
// 	],
// 	"createdAt": "2024-11-19T09:36:09.404Z",
// 	"updatedAt": "2024-11-19T10:15:35.734Z",
// 	"__v": 0,
// 	"path": "src/Challenges/ReactionSpeedChallenge/ReactionSpeedChallenge.tsx"
// }

const ChallengeCard = ({ challenge }) => {
  return (
    <div className={style.outer__card}>
      <div className={style.card}>
        <Link to={`${ROUTES.challenge.to}${challenge._id}`}>
          <img src={challenge.image} alt={challenge.name} />
          <div>
            <h1>{challenge.name}</h1>
            <h3>{challenge.description}</h3>
            <p>{challenge.category}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ChallengeCard;
