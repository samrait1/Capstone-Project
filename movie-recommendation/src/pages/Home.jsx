import React, { useState, useEffect } from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Requests";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating API fetch delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          <Main genre="popular" />
          <Row title="Upcoming" fetchURL={requests.requestUpcoming} />
          <Row title="Popular" fetchURL={requests.requestPopular} />
          <Row title="Top Rated" fetchURL={requests.requestTopRated} />
          <Row title="Trending" fetchURL={requests.requestTrending} />
          <Row title="Horror" fetchURL={requests.requestHorror} />
        </>
      )}
    </div>
  );
};

export default Home;