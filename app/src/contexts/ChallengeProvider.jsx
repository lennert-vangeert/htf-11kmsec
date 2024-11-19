import { createContext, useContext, useState, useEffect } from "react";

const ChallengeContext = createContext();

const ChallengeProvider = ({ children }) => {
  const [challengeData, setChallengeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const fetchChallenges = async () => {
    setIsLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/challenges`)
      .then((response) => response.json())
      .then((data) => setChallengeData(data))
      .catch((err) => setErrors(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <ChallengeContext.Provider value={{ challengeData, isLoading, errors }}>
      {children}
    </ChallengeContext.Provider>
  );
};

export default ChallengeProvider;

export const useChallenges = () => useContext(ChallengeContext);
