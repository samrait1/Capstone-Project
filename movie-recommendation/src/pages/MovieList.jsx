import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";
import { useSearchParams } from "react-router-dom";

const MovieList = ({ searchQuery }) => {
  const [searchParam] = useSearchParams();
  const key = process.env.REACT_APP_IMDB_API_KEY;

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const query = searchParam.get("q");
  console.log(query);
  const url = query
    ? `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=d9a2926d310b627aa44739b657eac1e2`
    : `https://api.themoviedb.org/3/movie/now_playing?api_key=d9a2926d310b627aa44739b657eac1e2&language=en-US&page=${page}`;

  useEffect(() => {
    fetchData(url);
  }, [page, url, searchQuery]);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data && data.results) {
        setMovies((prevState) => [...prevState, ...data.results]);
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(movies);

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <div className="mx-auto py-10 px-6 max-w-[90%]">
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:gap-x-8 mt-12">
          {movies.map((item) => (
            <Movie key={item.id} item={item} />
          ))}
        </div>
        <div className="flex items-center justify-center mt-10">
          <button
            className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded"
            onClick={loadMore}
            disabled={page > 15 ? true : false}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
