import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

 // Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBUaPgsDM544oSi_D-fLOWmLx-106Hcq18",

  authDomain: "myphotoalbum-f6413.firebaseapp.com",

  projectId: "myphotoalbum-f6413",

  storageBucket: "myphotoalbum-f6413.appspot.com",

  messagingSenderId: "672385428417",

  appId: "1:672385428417:web:9373907e950ca08c3e9d40"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectStorage = getStorage(app);
const projectFirestore = getFirestore();
const timestamp = serverTimestamp();

export {projectStorage, projectFirestore, timestamp};