import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
import { connectFirestoreEmulator, enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectStorageEmulator, getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHVC1CjL-x9I9dk0TdrjDRuy591kESYus",
  authDomain: "nutrition-planner-447fe.firebaseapp.com",
  databaseURL: "https://nutrition-planner-447fe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nutrition-planner-447fe",
  storageBucket: "nutrition-planner-447fe.firebasestorage.app",
  messagingSenderId: "33271731581",
  appId: "1:33271731581:web:a4bc5696e301ba6c5ee814",
  measurementId: "G-VH0KGB12HV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Connect to Firebase emulators in development
if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_EMULATORS === 'true') {
  // No need to connect the auth emulator in production
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectDatabaseEmulator(database, 'localhost', 9000);
  connectStorageEmulator(storage, 'localhost', 9199);
  connectFunctionsEmulator(functions, 'localhost', 5001);
  
  console.log('Connected to Firebase emulators');
}

// Enable offline persistence for Firestore
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db)
    .then(() => {
      console.log('Firestore persistence enabled');
    })
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open. Persistence can only be enabled in one tab at a time.');
      } else if (err.code === 'unimplemented') {
        console.warn('The current browser does not support IndexedDB persistence.');
      } else {
        console.error('Error enabling persistence:', err);
      }
    });
}

// Standardized Firebase error handling
export const handleFirebaseError = (error) => {
  console.error('Firebase error:', error);
  
  const errorCode = error.code || 'unknown';
  const errorMessage = error.message || 'An unknown error occurred';
  
  // Map common Firebase error codes to user-friendly messages
  const errorMessages = {
    'auth/user-not-found': 'No account found with this email address.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/account-exists-with-different-credential': 'An account already exists with the same email but different sign-in credentials.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled.',
    'auth/popup-closed-by-user': 'Sign-in popup closed before completing the sign-in process.',
    'auth/network-request-failed': 'A network error occurred. Please check your connection.',
    'auth/too-many-requests': 'Too many unsuccessful login attempts. Please try again later.',
    'auth/user-disabled': 'This account has been disabled.',
    'unavailable': 'Service temporarily unavailable. Please check your internet connection.',
    'permission-denied': 'You do not have permission to perform this action.'
  };
  
  let userMessage = errorMessages[errorCode] || errorMessage;
  
  // Check for offline errors
  if (errorCode === 'unavailable' || errorMessage.includes('offline')) {
    userMessage = 'You appear to be offline. Some features may be limited until you reconnect.';
  }
  
  return { errorCode, errorMessage, userMessage };
}; 