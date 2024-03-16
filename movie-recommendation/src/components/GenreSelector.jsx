import React, { useState, useEffect } from "react";
import Row from "./Row";

const GenreSelector = ({ genres }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = process.env.REACT_APP_IMDB_API_KEY;

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
              fetchURL={`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}`}
            />
          )}
        </>
      
    </div>
  );
};

export default GenreSelector;