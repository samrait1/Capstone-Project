import { getFirestore, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

// Initialize Firestore
const db = getFirestore();

// Function to save a show to Firestore
export const saveShow = async (userId, showData) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnapshot = await userDocRef.get();

    if (userDocSnapshot.exists()) {
      // If the document exists, update it
      await updateDoc(userDocRef, {
        savedShows: arrayUnion({ ...showData, favorite: true }) // Include favorite field
      });
    } else {
      // If the document doesn't exist, create it and set the initial data
      await setDoc(userDocRef, {
        savedShows: [{ ...showData, favorite: true }] // Include favorite field
      });
    }

    console.log("Show saved successfully!");
  } catch (error) {
    console.error("Error saving show:", error);
    throw error; // Rethrow the error to handle it in the calling component
  }
};

// Other Firestore functions can be defined here as well
