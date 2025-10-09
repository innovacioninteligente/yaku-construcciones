import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './client-config';

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// Initialize Firebase only on the client side
if (typeof window !== 'undefined' && !getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} else if (typeof window !== 'undefined') {
  app = getApp();
  auth = getAuth(app);
  db = getFirestore(app);
}

// Functions to get instances, ensures they are only called client-side
const getSafeAuth = () => {
  if (!auth) {
    throw new Error("Firebase Auth is not initialized. Make sure you are on the client-side.");
  }
  return auth;
}

const getSafeDb = () => {
    if (!db) {
        throw new Error("Firestore is not initialized. Make sure you are on the client-side.");
    }
    return db;
}

export { app, getSafeAuth, getSafeDb };
