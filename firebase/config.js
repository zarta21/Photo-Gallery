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

  // Here you have to paste config file info from your firebase project app.

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectStorage = getStorage(app);
const projectFirestore = getFirestore();
const timestamp = serverTimestamp();

export {projectStorage, projectFirestore, timestamp};