import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgCpnuAndiH7ca-ohxE9plv8YQ2bZc0G8",
  authDomain: "dayro-moreno.firebaseapp.com",
  projectId: "dayro-moreno",
  storageBucket: "dayro-moreno.firebasestorage.app",
  messagingSenderId: "936152250089",
  appId: "1:936152250089:web:93557bf1516842dc4ba278",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export { app };
