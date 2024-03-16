import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoMdPlay } from "react-icons/io";
import Youtube from "react-youtube";
import { AiFillStar } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { GiShare } from "react-icons/gi";
import { UserAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { arrayUnion, doc, updateDoc } from "@firebase/firestore";
import Row from "../components/Row"
import { saveShow } from "../firestoreUtils"; // Import the saveShow function


const MovieDetails = () => {
  const params = useParams();
  const key = process.env.REACT_APP_IMDB_API_KEY;

  const [movieData, setMovieData] = useState({
    info: [],
    liked: false
  });
  const [trailer, setTrailer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [like, setLike] = useState(false)
  const [saved, setSaved] = useState(false)
  const { user } = UserAuth()
  const [favorite, setFavorite] = useState(false)

  const movieID = doc(db, 'users', `${user?.email}`);
  //const [playing, setPlaying] = useState(false);
  // https://api.themoviedb.org/3/movie/now_playing?api_key=d9a2926d310b627aa44739b657eac1e2&language=en-US&page=1
  const url = `https://api.themoviedb.org/3/movie/${params.movieId}?api_key=d9a2926d310b627aa44739b657eac1e2&append_to_response=videos`;
  useEffect(() => {
    fetchData(url);
  }, [url]);
  useEffect(() => {
    // Reset the like state when a new movie is fetched
    setLike(false);
  }, [url]); // Reset when the URL changes

  const fetchData = async (url) => {
    axios
      .get(url)
      .then((response) => {
        setMovieData(response.data);
        const trailerid = response.data.videos.results.find(
          (vid) => vid.name === "Official Trailer"
        );
        setTrailer(trailerid ? trailerid : response.data.videos.results[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(movieData);
  
  
  const saveShow = async () => {
    if (user?.email) {
      // Toggle the like state
      setLike(!like);
  
      // Initialize savedShows if it's undefined
      const updatedSavedShows = movieData.savedShows || [];
  
      // If the movie is already saved, remove it from savedShows
      if (like) {
        const updatedShows = updatedSavedShows.filter(
          (show) => show.id !== movieData.id
        );
        await updateDoc(movieID, {
          savedShows: updatedShows,
        });
      } else {
        // Include all properties of the movie object along with the URL
        const url = `https://www.themoviedb.org/movie/${movieData.id}`;
  
        // Save the entire movieData object along with the URL to Firestore
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            ...movieData,
            url,
          }),
        });
      }
    } else {
      alert("Please log in to save Movies");
    }
  };


  const shareMovie = () => {
    navigator.share({
        title: movieData.title || movieData.original_title,
        url: window.location.href,
      })
      .then(() => console.log("Shared successfully."))
      .catch((error) => console.log("Error sharing:", error));
  
    };

  return (
    <div className=" h-[90vh]">
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden 
              overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex 
                  flex-col w-full bg-transparent outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between border-b p-2 ">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-white opacity-100  
                        float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-white opacity-100 
                         h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <>
                  <Youtube
                    videoId={trailer.key}
                    className="w-[50vh] h-[50vh] md:w-[100vh] md:h-[60vh]"
                    opts={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </>

                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>

        </>
      ) : null}

      <div className="">
        <div className="absolute w-full h-[70vh] bg-gradient-to-t from-black ">
          {" "}
        </div>
        <img
          src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path || movieData.poster_path
            }`}
          alt=""
          className="w-full h-[70vh] object-cover "
        />
      </div>
      <div className="flex justify-center ">
        <div className="flex flex-col items-center md:flex-row md:max-w-2xl lg:max-w-3xl absolute xl:max-w-4xl md:mt-[-300px] mt-[-200px] text-white ">
          <div className=" lg:w-[30%] h-auto md:h-[400px] w-[70%] ">
            <img
              className="w-[100%] h-full md:h-auto object-cover rounded-md"
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
              alt=""
            />
          </div>
          <div className="float-left w-[70%] md:pl-12 ">
            <p className="text-3xl md:text-5xl mb-3 mt-3 md:mt-0">
              {movieData.title || movieData.original_title}{" "}
            </p>
            <div className="flex flex-row items-center ">
              <div className="flex flex-row justify-center items-center mr-5 pb-2">
                <AiFillStar className="text-3xl mr-2" />
                <p className="text-4xl ">
                  {movieData?.vote_average?.toFixed(1)}{" "}
                </p>
              </div>
              <div className="flex flex-col">
                <div className="grid grid-flow-col auto-cols-max gap-4 ">
                  <p className="text-cyan-600 text-sm md:text-base">
                    Released: {movieData?.release_date}{" "}
                  </p>
                  <p className="text-cyan-600 text-sm md:text-base">
                    {movieData?.runtime} min
                  </p>
                </div>

                <div className="grid grid-flow-col auto-cols-max gap-4 mb-3">
                  {movieData.genres &&
                    movieData.genres.slice(0, 5).map((genre, i) => (
                      <span key={i} className="text-sm  md:text-base">
                        {genre.name}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            <p className="text-gray-300 mb-8">{movieData.overview} </p>
            <div className="flex flex-row items-center ">
              <button
                onClick={() => setShowModal(true)}
                className="border text-[#FFFDE3] text-base border-gray-300 py-2 px-5 flex flex-row items-center hover:bg-cyan-600 hover:border-cyan-600 mb-8 md:mb-0"
              >
                <IoMdPlay className="mr-3" />
                Watch Trailer
              </button>

              <p onClick={saveShow} className=" cursor-pointer">
                {like ? (
                  <div className="flex flex-row gap-2">
                    <FaHeart className="text-gray-300 text-2xl ml-6 mb-8 md:mb-0" />
                    <p> Added to Favorites!</p>
                  </div>
                ) : (
                  <div className="flex flex-row gap-2">
                    <FaRegHeart className="text-gray-300 text-2xl ml-6 mb-8 md:mb-0" />
                    <p> Add to Favorites</p>
                  </div>
                )}
              </p>
              <p>
                <GiShare className="text-gray-300 text-2xl ml-3 mb-8 md:mb-0"  onClick={shareMovie}/>
              </p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <br /><br /><br /><br /><br /> <br />
      <Row title="Recommendations" className="mt-12 py-12" fetchURL={`https://api.themoviedb.org/3/movie/${params.movieId}/recommendations?api_key=d9a2926d310b627aa44739b657eac1e2&language=en-US&page=1`} rowID='1' genre="upcoming" />

    </div>
  );
};

export default MovieDetails;
