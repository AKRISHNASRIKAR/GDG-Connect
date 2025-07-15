import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD7MlmxEwRX_Vs3Nt-dFbUau5XW0tEm0Fs",
  authDomain: "gdg-connect-f27f7.firebaseapp.com",
  databaseURL: "https://gdg-connect-f27f7-default-rtdb.firebaseio.com",
  projectId: "gdg-connect-f27f7",
  storageBucket: "gdg-connect-f27f7.appspot.com",
  messagingSenderId: "780528793139",
  appId: "1:780528793139:web:1dbe9d6e91f38b59245546",
  measurementId: "G-Y2V51S9PXC",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;

// Optional: test function
export const testFirebaseConnection = () => {
  try {
    console.log("Firebase initialized successfully");
    console.log("Firestore instance:", db);
    return true;
  } catch (error) {
    console.error("Firebase initialization error:", error);
    return false;
  }
};
