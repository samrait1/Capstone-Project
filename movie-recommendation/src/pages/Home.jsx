import React, { useState, useEffect } from "react";
import Main from "../components/Main";
import requests from "../Requests";
import GenreSelector from "../components/GenreSelector";

const Home = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(requests.requestGenres);
        const data = await response.json();
        setGenres(data.genres);
        setIsLoading(false);
      } catch (error) {
        // Handle error
      }
    };

    fetchGenres();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          <GenreSelector genres={genres} />
          <Main />
        </>
      )}
    </div>
  );
};

export default Home;