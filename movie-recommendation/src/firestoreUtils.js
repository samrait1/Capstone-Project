// firebase/firestoreUtils.js
import { getFirestore, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

// Initialize Firestore
const db = getFirestore();

// Function to save a show to Firestore
export const saveShow = async (userId, showData) => {
    try {
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, {
            [showData.id.toString()]: { // Assuming showData.id is unique and represents each movie
                id: showData.id,
                img: showData.img,
                title: showData.title,
                favorite: true // Set favorite to true when saving the show
            }
        });
        console.log("Show saved successfully!");
    } catch (error) {
        console.error("Error saving show:", error);
        throw error;
    }
};


