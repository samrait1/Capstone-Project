import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import SavedShow from "../components/SavedShow";
import { UserAuth } from "../context/AuthContext";

const Account = () => {
  const [savedShows, setSavedShows] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    const fetchSavedShows = async () => {
      if (user) {
        try {
          const userID = user.uid;
          const savedShowsRef = collection(db, "users", userID, "savedShows");
          const savedShowsSnapshot = await getDocs(savedShowsRef);
          const savedShowsData = savedShowsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setSavedShows(savedShowsData);
        } catch (error) {
          console.error("Error fetching saved shows:", error);
        }
      }
    };

    fetchSavedShows();
  }, [user]); // Include user as a dependency to trigger the effect when user changes

  return (
    <div>
      <div className='w-full text-white'>
        <img
          className='w-full h-[400px] object-cover'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
          alt='/'
        />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-[550px]'></div>
        <h1 className='absolute right-0 left-0 bottom-0 top-[20%] text-3xl md:text-5xl font-bold text-center'>
          My Saved Shows
        </h1>
      </div>
      {savedShows.map((show) => (
        <SavedShow key={show.id} show={show} />
      ))}
    </div>
  );
};

export default Account;
