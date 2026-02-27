import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, onSnapshot, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE,
  messagingSenderId: process.env.REACT_APP_FB_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Auth helpers
export const loginEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const registerEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const loginGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);
export const onAuth = (callback) => onAuthStateChanged(auth, callback);

// Firestore helpers
export const saveUserData = async (userId, collectionName, docId, data) => {
  await setDoc(doc(db, "users", userId, collectionName, docId), data);
};

export const getUserDoc = async (userId, collectionName, docId) => {
  const snap = await getDoc(doc(db, "users", userId, collectionName, docId));
  return snap.exists() ? snap.data() : null;
};

export const deleteUserDoc = async (userId, collectionName, docId) => {
  await deleteDoc(doc(db, "users", userId, collectionName, docId));
};

export const subscribeToCollection = (userId, collectionName, callback) => {
  const q = query(collection(db, "users", userId, collectionName));
  return onSnapshot(q, (snapshot) => {
    const items = [];
    snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
    callback(items);
  });
};
