import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { onSnapshot, doc } from "firebase/firestore";
import Movie from "../components/Movie";

const Account = () => {
  const [savedShows, setSavedShows] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        doc(db, "users", `${user.email}`),
        (doc) => {
          if (doc.exists()) {
            setSavedShows(doc.data().savedShows);
          }
        }
      );

      return () => unsubscribe();
    }
  }, [user?.email]);

  return (
    <div>
      <div className="w-full text-white">
        <img
          className="w-full h-[400px] object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]"></div>
        <h1 className="absolute right-0 left-0 bottom-0 top-[20%] text-3xl md:text-5xl font-bold text-center">
          My Saved Shows
        </h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Saved Shows</h2>
        {savedShows.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {savedShows.map((show, index) => (
              <div key={show.id} className="relative movie-item">
                <Movie item={show} genre="movie" />
              </div>
            ))}
          </div>
        ) : (
          <p>No saved shows yet.</p>
        )}
      </div>
    </div>
  );
};

export default Account;
