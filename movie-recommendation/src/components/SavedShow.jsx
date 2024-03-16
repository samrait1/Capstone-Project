import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../Firebase"; // Importing db from Firebase
import { doc, onSnapshot, updateDoc } from "firebase/firestore"; // Importing Firestore functions
import { AiOutlineClose } from "react-icons/ai";
import { saveShow } from "../firestoreUtils"; // Importing saveShow function from firestoreUtils

const SavedShow = () => {
    const [movies, setMovies] = useState([]);
    const { user } = UserAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'users', user?.id); // Removed unnecessary string interpolation
                const unsubscribe = onSnapshot(docRef, (doc) => {
                    // Filter only the shows marked as favorite
                    const favoriteShows = (doc.data()?.savedShows || []).filter(show => show.favorite);
                    setMovies(favoriteShows);
                });
                return unsubscribe;
            } catch (error) {
                console.error("Error getting document:", error);
            }
        };
        fetchData();
    }, [user?.uid]); // Updated to use user.uid as dependency

    const deleteShow = async (passId) => {
        try {
            const updatedMovies = movies.filter((item) => item.id !== passId);
            const movieRef = doc(db, 'users', user?.uid); // Updated to use user.uid
            await updateDoc(movieRef, {
                savedShows: updatedMovies
            });
        } catch (error) {
            console.log("Error deleting show:", error);
        }
    };

    const handleSaveShow = async (showData) => {
        try {
            await saveShow(user?.uid, showData); // Updated to use user.uid
            console.log("Show saved successfully!");
        } catch (error) {
            console.error("Error saving show:", error);
        }
    };

    return (
        <div>
            <div className="mx-auto max-w-2xl py-10 px-2 sm:py-10 sm:px-6 lg:max-w-7xl">
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {movies.map((item) => (
                        <div key={item.id} className="inline-block cursor-pointer relative ">
                            <img
                                className="w-full h-auto block"
                                src={`https://image.tmdb.org/t/p/w500${item?.img}`}
                                alt=""
                            />
                            <div className="absolute top-0 left-0 w-full h-full hover:bg-black/60 opacity-0 hover:opacity-100 text-white">
                                <p onClick={() => deleteShow(item.id)} className="absolute text-gray-300 top-4 right-4"><AiOutlineClose/></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SavedShow;
