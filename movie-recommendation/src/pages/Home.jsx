import React, { useState, useEffect } from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import GenreSelector from "../components/GenreSelector";
import requests from "../Requests";

const Home = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(requests.requestGenres);
        const data = await response.json();
        setGenres(data.genres);
        setIsLoading(false);
      } catch (error) {
        setError("Error occurred while fetching data");
        setIsLoading(false);
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
          <Main genre="popular" />
          <Row title="UpComing" fetchURL={requests.requestUpcoming} rowID='1' genre="upcoming" />
          <Row title="Popular" fetchURL={requests.requestPopular} rowID='2' genre="popular" />
          <Row title="Top Rated" fetchURL={requests.requestTopRated} rowID='3' genre="top_rated" />
          <Row title="Trending" fetchURL={requests.requestTrending} rowID='4' genre="popular" />
          <Row title="Horror" fetchURL={requests.requestHorror} rowID='5'  genre ="horror"/>
          <Row title="Romance" fetchURL={requests.requestRomance} rowID='6' genre="romance" />
          <Row title="Comedy" fetchURL={requests.requestComedy} rowID='7' genre="comedy" />
          <Row title="Fantasy" fetchURL={requests.requestFantasy} rowID='8' genre="fantasy" />
        </>
      )}
    </div>
  );
};

export default Home;