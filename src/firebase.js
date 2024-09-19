// Firebase
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtXNJgSGtvi4E9k9L-qhWU_zYxbuJ22Jc",
  authDomain: "parcial-2-pwa.firebaseapp.com",
  projectId: "parcial-2-pwa",
  storageBucket: "parcial-2-pwa.appspot.com",
  messagingSenderId: "1011605754455",
  appId: "1:1011605754455:web:926aec6278b8e7e0f64912",
};

// Initialize Firebase
const appFB = initializeApp(firebaseConfig);

export default appFB;
