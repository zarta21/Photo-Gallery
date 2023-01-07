import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

import { initializeApp } from "firebase/app";

const firebaseConfig = {

  // Here you have to paste config file info from your firebase project app.

};

const app = initializeApp(firebaseConfig);
const projectStorage = getStorage(app);
const projectFirestore = getFirestore();
const timestamp = serverTimestamp();

export {projectStorage, projectFirestore, timestamp};
