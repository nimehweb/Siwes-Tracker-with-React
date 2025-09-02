// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH1EVrDgOfKTGKLksc8TkE89QI5vacYwA",
  authDomain: "siwes-tracker-e9ef2.firebaseapp.com",
  projectId: "siwes-tracker-e9ef2",
  storageBucket: "siwes-tracker-e9ef2.firebasestorage.app",
  messagingSenderId: "529435527401",
  appId: "1:529435527401:web:563ac27e8eaf5802bb4878"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore(app);
export default app;