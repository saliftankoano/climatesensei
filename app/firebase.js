// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // No need to export signInWithEmailAndPassword

const firebaseConfig = {
  apiKey: "AIzaSyDjH5yaA7pW2guzFi8WjrOdbggCB1uOY5o",
  authDomain: "climatesensei.firebaseapp.com",
  projectId: "climatesensei",
  storageBucket: "climatesensei.appspot.com",
  messagingSenderId: "342673471216",
  appId: "1:342673471216:web:1c57549c0232803359b435",
  measurementId: "G-TJXWPXC97D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };  // Export only the auth object
