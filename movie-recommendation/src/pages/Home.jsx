import React, { useState, useEffect } from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import GenreSelector from "../components/GenreSelector";
import requests from "../Requests";
import { UserAuth } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

const Home = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteShows, setFavoriteShows] = useState([]);
  const { user } = UserAuth();

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

    const fetchFavoriteShows = async () => {
      if (user) {
        try {
          const userID = user.uid;
          const favoriteShowsRef = collection(db, "users", userID, "savedShows");
          const favoriteShowsSnapshot = await getDocs(favoriteShowsRef);
          const favoriteShowsData = favoriteShowsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setFavoriteShows(favoriteShowsData);
        } catch (error) {
          console.error("Error fetching favorite shows:", error);
        }
      }
    };

    fetchGenres();
    fetchFavoriteShows();
  }, [user]);

  return (
    <div>
      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          <GenreSelector genres={genres} />
          <Main genre="popular" favoriteShows={favoriteShows} />
          <Row title="UpComing" fetchURL={requests.requestUpcoming} rowID='1' genre="upcoming" favoriteShows={favoriteShows} />
          <Row title="Popular" fetchURL={requests.requestPopular} rowID='2' genre="popular" favoriteShows={favoriteShows} />
          <Row title="Top Rated" fetchURL={requests.requestTopRated} rowID='3' genre="top_rated" favoriteShows={favoriteShows} />
          <Row title="Trending" fetchURL={requests.requestTrending} rowID='4' genre="popular" favoriteShows={favoriteShows} />
          <Row title="Horror" fetchURL={requests.requestHorror} rowID='5' favoriteShows={favoriteShows} />
        </>
      )}
    </div>
  );
};

export default Home;
