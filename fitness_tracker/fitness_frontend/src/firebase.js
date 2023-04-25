import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // Add this import


const firebaseConfig = {
  apiKey: "AIzaSyA52p_7bAjYqIDHIIU3nECuljQ9_Lsz8r4",
  authDomain: "fitness-wearable-20b9d.firebaseapp.com",
  projectId: "fitness-wearable-20b9d",
  storageBucket: "fitness-wearable-20b9d.appspot.com",
  messagingSenderId: "551481552952",
  appId: "1:551481552952:web:c4896638c53d29dd7e76cd",
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app); // Update this line 
