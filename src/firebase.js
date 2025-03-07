// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCIMHqFJD4GB2c15XkcRskxGp_7BTIJz10",
  authDomain: "website-recreation.firebaseapp.com",
  projectId: "website-recreation",
  storageBucket: "website-recreation.firebasestorage.app",
  messagingSenderId: "684091434546",
  appId: "1:684091434546:web:b29f57cb70547a61803e2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);