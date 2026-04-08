import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration using Vite environment variables with fallbacks for preview
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAIW0Qab_-rQd4bVk86kJCWHhomTD6CkTY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fab-and-fleek-beauty-center.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fab-and-fleek-beauty-center",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fab-and-fleek-beauty-center.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "304483636654",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:304483636654:web:3dc68831def8e5be90a43f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);