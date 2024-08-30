// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "interventionapp-65f6d.firebaseapp.com",
  projectId: "interventionapp-65f6d",
  storageBucket: "interventionapp-65f6d.appspot.com",
  messagingSenderId: "176105904453",
  appId: "1:176105904453:web:d22acc6a1d3cc15f60462c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);