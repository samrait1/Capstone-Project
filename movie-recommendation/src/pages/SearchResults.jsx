import React from "react";
import { useLocation } from "react-router-dom";
import MovieList from "./MovieList";

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");

  return (
    <div>
      <h2>Search Results for: {searchQuery}</h2>
      <MovieList searchQuery={searchQuery} />
    </div>
  );
};

export default SearchResults;