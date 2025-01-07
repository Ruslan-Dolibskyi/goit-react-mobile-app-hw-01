import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAa31uLFJhjger8o4YgtuDCJ6v5GlYgQ1Y",
  authDomain: "goitmyapp.firebaseapp.com",
  projectId: "goitmyapp",
  storageBucket: "goitmyapp.appspot.com",
  messagingSenderId: "12016444223",
  appId: "1:12016444223:web:abc123",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);

// Функції авторизації
export const registerUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutUser = async () => signOut(auth);

export const monitorAuthState = (callback) =>
  onAuthStateChanged(auth, (user) => callback(user));

// Функції для роботи з профілем
export const updateUserProfile = async (displayName, photoURL) => {
  const user = auth.currentUser;
  if (user) {
    await updateProfile(user, { displayName, photoURL });
  }
};

export const getUserProfile = () => {
  const user = auth.currentUser;
  if (user) {
    return {
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
    };
  }
  return null;
};

// Функції для постів
export const fetchPosts = async () => {
  try {
    const postsCollection = collection(db, "posts");
    const postsSnapshot = await getDocs(postsCollection);
    return postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const addPost = async (post) => {
  try {
    const postsCollection = collection(db, "posts");
    await addDoc(postsCollection, post);
    console.log("Post added successfully!");
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};

export const monitorPosts = (callback) => {
  const postsCollection = collection(db, "posts");
  const postsQuery = query(postsCollection, orderBy("createdAt", "desc"));
  return onSnapshot(postsQuery, (snapshot) => {
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(posts);
  });
};

// Функції для коментарів
export const addCommentToPost = async (postId, comment) => {
  try {
    const commentsCollection = collection(db, `posts/${postId}/comments`);
    await addDoc(commentsCollection, comment);
    console.log("Comment added successfully!");
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};
