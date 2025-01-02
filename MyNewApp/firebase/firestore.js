import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config";

export const writeDataToFirestore = async (collectionName, data) => {
  return addDoc(collection(db, collectionName), data);
};

export const getDataFromFirestore = async (collectionName) => {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateDataInFirestore = async (collectionName, docId, updates) => {
  const ref = doc(db, collectionName, docId);
  return updateDoc(ref, updates);
};
