import React, { useState, useEffect } from "react";
import requests from "../Requests";
import Row from "../components/Row";

const GenreSelector = ({ genres }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (genres.length > 0) {
      setSelectedGenre(genres[0].id);
      setIsLoading(false);
    }
  }, [genres]);

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
  };

  return (
    <div>
      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          <div className="genre-buttons">
            {genres.map((genre) => (
              <button
                key={genre.id}
                className={selectedGenre === genre.id ? "active" : ""}
                onClick={() => handleGenreChange(genre.id)}
              >
                {genre.name}
              </button>
            ))}
          </div>
          {selectedGenre && (
            <Row
              title="Movies"
              fetchURL={`${requests.requestMoviesByGenre}${selectedGenre}`}
            />
          )}
        </>
      )}
    </div>
  );
};

export default GenreSelector;