import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDic15piw7C6-CR1cK5Q7AbwNggN8-XlQA",
    authDomain: "https://workout-tracker-project-blush.vercel.app",
    projectId: "workout-tracker-abb9a",
    storageBucket: "workout-tracker-abb9a.appspot.com",
    messagingSenderId: "74719337073",
    appId: "1:74719337073:web:f840592f249527873959d0",
    measurementId: "G-4Y9DCMBT4L"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);

  export const provider = new GoogleAuthProvider();
  


  export const db = getFirestore(app);