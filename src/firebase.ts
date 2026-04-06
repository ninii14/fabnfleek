import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIW0Qab_-rQd4bVk86kJCWHhomTD6CkTY",
  authDomain: "fab-and-fleek-beauty-center.firebaseapp.com",
  projectId: "fab-and-fleek-beauty-center",
  storageBucket: "fab-and-fleek-beauty-center.firebasestorage.app",
  messagingSenderId: "304483636654",
  appId: "1:304483636654:web:3dc68831def8e5be90a43f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
