import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../config";

export const registerDB = async ({ email, password }) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const authStateChanged = (onChange) => {
  onAuthStateChanged(auth, (user) => onChange(user));
};

export const loginDB = async ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const updateUserProfileWithRedux = async (update, dispatch, action) => {
  const user = auth.currentUser;
  if (user) {
    await updateProfile(user, update);
    dispatch(
      action({
        uid: user.uid,
        email: user.email,
        displayName: update.displayName || user.displayName,
        photoURL: update.photoURL || user.photoURL,
      })
    );
  }
};

export const logoutUser = async () => {
  return signOut(auth);
};
