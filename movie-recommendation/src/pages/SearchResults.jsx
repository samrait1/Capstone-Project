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
    setKey((prevKey) => prevKey + 1);
  }, [searchQuery]);

  return (
    <div className="relative min-h-screen pt-16">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')`,
          backgroundSize: "cover",
          filter: "blur(10px)",
          opacity: "0.8",
        }}
      ></div>
      <div className="bg-gray-900 bg-opacity-75 min-h-screen pt-16 text-white relative">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mt-6 mb-4">{`Search Results for: ${currentQuery}`}</h2>
          <MovieList key={key} searchQuery={currentQuery} />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;