// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw6i2MMXEEGKneR5yspwTYHBBs7NYkOW8",
  authDomain: "flashcards-471bb.firebaseapp.com",
  projectId: "flashcards-471bb",
  storageBucket: "flashcards-471bb.appspot.com",
  messagingSenderId: "581647946064",
  appId: "1:581647946064:web:7552578c8b516ae3c01c55",
  measurementId: "G-HSWS14MHXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const db = getDatabase(app);

export { auth, db, app }

