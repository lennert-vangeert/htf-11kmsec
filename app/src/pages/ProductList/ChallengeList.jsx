import React, { useEffect, useState } from "react";
import style from "./ChallengeList.module.css";
import ChallengeCard from "../../components/ChallengeCard/ChallengeCard"; // Assuming this replaces ProductCard
import Loader from "../../components/Loader/Loader";
import { useChallenges } from "../../contexts/ChallengeProvider";

const ChallengeList = () => {
  const { challengeData, isLoading, errors } = useChallenges();
  const [filteredData, setFilteredData] = useState([]);
  const [searchFormData, setSearchFormData] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    categories: new Set(),
    difficulty: new Set(),
    tags: new Set(),
  });
  const [sortOption, setSortOption] = useState("");

  const filter = () => {
    let dataCopy = structuredClone(challengeData);

    dataCopy = dataCopy.filter((challenge) => {
      const matchesSearch =
        challenge.name.toLowerCase().includes(searchFormData.toLowerCase()) ||
        challenge.description
          .toLowerCase()
          .includes(searchFormData.toLowerCase());
      const matchesCategory =
        activeFilters.categories.size === 0 ||
        activeFilters.categories.has(challenge.category);
      const matchesDifficulty =
        activeFilters.difficulty.size === 0 ||
        activeFilters.difficulty.has(challenge.difficulty);
      const matchesTags =
        activeFilters.tags.size === 0 ||
        challenge.tags.some((tag) => activeFilters.tags.has(tag));

      return (
        matchesSearch && matchesCategory && matchesDifficulty && matchesTags
      );
    });

    // Sort the data based on the selected sort option
    if (sortOption === "nameAsc") {
      dataCopy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "nameDesc") {
      dataCopy.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredData(dataCopy);
  };

  const handleFilterClick = (filterType, filterValue) => {
    setActiveFilters((prevFilters) => {
      const newFilters = structuredClone(prevFilters);
      if (newFilters[filterType].has(filterValue)) {
        newFilters[filterType].delete(filterValue);
      } else {
        newFilters[filterType].add(filterValue);
      }
      return newFilters;
    });
  };

  const toggleFilterContainer = () => {
    const filterContainer = document.querySelector(
      `.${style.filter__container}`
    );
    filterContainer.classList.toggle(style.filter__visible);
  };

  useEffect(() => {
    if (challengeData) filter();
  }, [searchFormData, activeFilters, sortOption]);

  useEffect(() => {
    if (!isLoading && !errors) setFilteredData(challengeData);
  }, [isLoading]);

  if (isLoading) return <Loader />;
  else
    return (
      <div className={style.container}>
        <div className={`${style.filter__hamburger} ${style.outer__hamburger}`}>
          <svg
            onClick={toggleFilterContainer}
            xmlns="http://www.w3.org/2000/svg"
            width="24.75"
            height="22.5"
            viewBox="0 0 24.75 22.5"
          >
            <path
              d="M5.625,6.75h24.75V9H5.625Zm0,10.125h24.75v2.25H5.625ZM5.625,27h24.75v2.25H5.625Z"
              transform="translate(-5.625 -6.75)"
              fill="#c00"
            />
          </svg>
        </div>
        <section className={style.filter__container}>
          <div className={style.filter__hamburger}>
            <svg
              onClick={toggleFilterContainer}
              xmlns="http://www.w3.org/2000/svg"
              width="24.75"
              height="22.5"
              viewBox="0 0 24.75 22.5"
            >
              <path
                d="M5.625,6.75h24.75V9H5.625Zm0,10.125h24.75v2.25H5.625ZM5.625,27h24.75v2.25H5.625Z"
                transform="translate(-5.625 -6.75)"
                fill="#c00"
              />
            </svg>
          </div>
          <h1 className={style.filter__title}>Filters</h1>

          <h2 className={style.filter__subtitle}>Sort</h2>
          <p
            className={`${style.filter__item} ${
              sortOption === "nameAsc" ? style.active : ""
            }`}
            onClick={() => setSortOption("nameAsc")}
          >
            Name Ascending
          </p>
          <p
            className={`${style.filter__item} ${
              sortOption === "nameDesc" ? style.active : ""
            }`}
            onClick={() => setSortOption("nameDesc")}
          >
            Name Descending
          </p>

          <h2 className={style.filter__subtitle}>Category</h2>
          {["Physical", "Mental", "Puzzle", "Riddle"].map((category) => (
            <p
              key={category}
              className={`${style.filter__item} ${
                activeFilters.categories.has(category) ? style.active : ""
              }`}
              onClick={() => handleFilterClick("categories", category)}
            >
              {category}
            </p>
          ))}

          <h2 className={style.filter__subtitle}>Difficulty</h2>
          {["easy", "medium", "hard"].map((difficulty) => (
            <p
              key={difficulty}
              className={`${style.filter__item} ${
                activeFilters.difficulty.has(difficulty) ? style.active : ""
              }`}
              onClick={() => handleFilterClick("difficulty", difficulty)}
            >
              {difficulty}
            </p>
          ))}

          <h2 className={style.filter__subtitle}>Tags</h2>
          {[
            "running", "reaction time", "language", "trivia", "math", "coordination", "tactics", "strategy", "memory", "focus", "attention", "problem solving", "creativity", "critical thinking", "spatial awareness", "pattern recognition", "observation", "deduction", "reasoning", "logic", "analysis", "decision making",
          ].map((tag) => (
            <p
              key={tag}
              className={`${style.filter__item} ${
                activeFilters.tags.has(tag) ? style.active : ""
              }`}
              onClick={() => handleFilterClick("tags", tag)}
            >
              {tag}
            </p>
          ))}
        </section>

        <section className={style.challenge__container}>
          <form className={style.form} action="">
            <input
              type="text"
              placeholder="Search for challenges"
              className={style.search__input}
              value={searchFormData}
              onChange={(e) => setSearchFormData(e.currentTarget.value)}
            />
          </form>

          <div className={style.challenge__grid}>
            {filteredData.length !== 0 ? (
              filteredData.map((challenge, index) => (
                <ChallengeCard key={index} challenge={challenge} />
              ))
            ) : (
              <p>No challenges found</p>
            )}
          </div>
        </section>
      </div>
    );
};

export default ChallengeList;
