// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0xEzQsOputbitKjbN2VuaDaliTAJffOg",
  authDomain: "jobprotal-67a1f.firebaseapp.com",
  projectId: "jobprotal-67a1f",
  storageBucket: "jobprotal-67a1f.firebasestorage.app",
  messagingSenderId: "21004901003",
  appId: "1:21004901003:web:a54f89e67ba86290e0928e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };