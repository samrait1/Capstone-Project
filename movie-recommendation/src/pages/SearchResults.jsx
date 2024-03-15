import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieList from "./MovieList";

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");
  const [currentQuery, setCurrentQuery] = useState(searchQuery);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setCurrentQuery(searchQuery);
    setKey(prevKey => prevKey + 1);
  }, [searchQuery]);

  return (
    <div className="bg-gray-900 min-h-screen pt-16 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mt-6 mb-4">{`Search Results for: ${currentQuery}`}</h2>
        <MovieList key={key} searchQuery={currentQuery} />
      </div>
    </div>
  );
};

export default SearchResults;