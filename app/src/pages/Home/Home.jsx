import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import { useChallenges } from "../../contexts/ChallengeProvider";
import ProductHighlight from "../../components/ProductHighlight/ProductHighlight";
import Loader from "../../components/Loader/Loader";
import Mapbox from "../../components/Mapbox/Mapbox";

const Home = () => {
  const { challengeData, isLoading, errors } = useChallenges();

  return <div></div>;
};

export default Home;
