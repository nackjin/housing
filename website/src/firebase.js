import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrOCQc8T-7ruDk5by8v5d2GrbnDHSiT_c",
  authDomain: "housing-welfare-116d1.firebaseapp.com",
  projectId: "housing-welfare-116d1",
  storageBucket: "housing-welfare-116d1.firebasestorage.app",
  messagingSenderId: "377342025080",
  appId: "1:377342025080:web:95b8d55aae11637cd87c8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
