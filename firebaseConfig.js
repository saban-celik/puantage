import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnz-pv9unbUaMPZE3Zo9n5OHiDdJiB4JM",
  authDomain: "puantage.firebaseapp.com",
  projectId: "puantage",
  storageBucket: "puantage.appspot.com",
  messagingSenderId: "292732627791",
  appId: "1:292732627791:web:8962054b411067a316333a",
  measurementId: "G-YFDWRQPY54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, analytics, auth, provider, db };
