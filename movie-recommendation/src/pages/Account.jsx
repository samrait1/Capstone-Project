import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import SavedShow from "../components/SavedShow";
import { UserAuth } from "../context/AuthContext";

const Account = () => {
  const [savedShows, setSavedShows] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    if(usser){
      const unsubscribe = onSnapshot(doc(db, "users", `${user.email}`), (doc) =>{
        if(doc.exists()) {
          setSavesShows(doc.data().savedShows);
      }
      });
     return () => unsubscribe();
  }, [user?.email]); // Include user as a dependency to trigger the effect when user changes

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
        
      </div classNam="container mx-auto px-4 py-8">
       <h2 className="text-2xl font-bold mb-4">Saved Shows</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {savedShows.map((show) => (
        <div key={show.id} className="bg-gray-800 p-4 rounded-lg">
        <img
          src={show.img || "https://via.placeholder.com/150"}
          alt={show.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <h3 className="text-white text-lg font-semibold mt-2">{show.title}</h3>
        </div>
      ))}
        </div>
      </div>
    </div>
  );
};

export default Account;
