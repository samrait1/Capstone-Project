import React, { useState, useEffect } from "react";
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
                const docRef = doc(db, 'users', user?.email);
                const unsubscribe = onSnapshot(docRef, (doc) => {
                    setMovies(doc.data()?.savedShows || []);
                });
                return unsubscribe;
            } catch (error) {
                console.error("Error getting document:", error);
            }
        };
        fetchData();
    }, [user]); // Removed unnecessary email dependency

    const deleteShow = async (passId) => {
        try {
            const updatedMovies = movies.filter((item) => item.id !== passId); // Renamed result to updatedMovies
            const movieRef = doc(db, 'users', user?.email);
            await updateDoc(movieRef, {
                savedShows: updatedMovies // Updated to use updatedMovies
            });
            setMovies(updatedMovies); // Update local state
        } catch (error) {
            console.log("Error deleting show:", error);
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
                                <button onClick={() => deleteShow(item.id)} className="absolute text-gray-300 top-4 right-4"><AiOutlineClose /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SavedShow;
