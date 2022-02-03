// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAdSVRmTB2OTBsNWUTCZD8cdAHbn7ZNVag",
  authDomain: "teacher-insight.firebaseapp.com",
  projectId: "teacher-insight",
  storageBucket: "teacher-insight.appspot.com",
  messagingSenderId: "368953510148",
  appId: "1:368953510148:web:949025c16b7e228d772851",
  measurementId: "G-98MD28KEDH"
});

// Initialize Firebase
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default firebaseApp;