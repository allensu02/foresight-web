import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7giFOvqkFmnC5n-NzULIqVewIDgnPRd8",
  authDomain: "fore-542c0.firebaseapp.com",
  projectId: "fore-542c0",
  storageBucket: "fore-542c0.appspot.com",
  messagingSenderId: "61997329803",
  appId: "1:61997329803:web:41fae810a97c91732dd38e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
