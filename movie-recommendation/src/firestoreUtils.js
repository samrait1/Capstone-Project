// firebase/firestoreUtils.js
import { getFirestore, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";


const db = getFirestore();

export const saveShow = async (userId, showData) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnapshot = await userDocRef.get();

    if (userDocSnapshot.exists()) {
      
      await updateDoc(userDocRef, {
        savedShows: arrayUnion(showData)
      });
    } else {
      
      await setDoc(userDocRef, {
        savedShows: [showData]
      });
    }

    console.log("Show saved successfully!");
  } catch (error) {
    console.error("Error saving show:", error);
    throw error; 
  }
};


