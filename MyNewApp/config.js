import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAa31uLFJhjger8o4YgtuDCJ6v5GlYgQ1Y",
  authDomain: "goitmyapp.firebaseapp.com",
  projectId: "goitmyapp",
  storageBucket: "gs://goitmyapp.firebasestorage.app",
};

// Ініціалізація додатку Firebase
const app = initializeApp(firebaseConfig);

// Експортуємо сервіси для використання у додатку
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
