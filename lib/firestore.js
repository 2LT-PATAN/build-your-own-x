import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from './firebase';

// Users Collection Operations
export const createUserProfile = async (user) => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      preferences: {
        dietType: 'veg',
        fitnessGoal: 'maintain',
        targetCalories: 2000,
        createdAt: serverTimestamp()
      },
      metricsHistory: [],
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    };
    
    await setDoc(userRef, userData);
    return userData;
  } else {
    // Update lastLogin time
    await updateDoc(userRef, {
      lastLogin: serverTimestamp()
    });
    return userSnap.data();
  }
};

export const updateUserPreferences = async (userId, preferences) => {
  const userRef = doc(db, 'users', userId);
  
  await updateDoc(userRef, {
    'preferences': {
      ...preferences,
      updatedAt: serverTimestamp()
    }
  });
};

export const addUserMetrics = async (userId, metrics) => {
  const userRef = doc(db, 'users', userId);
  
  await updateDoc(userRef, {
    metricsHistory: arrayUnion({
      ...metrics,
      date: serverTimestamp()
    })
  });
};

// Nutrition Plans Collection Operations
export const createNutritionPlan = async (planData) => {
  const planRef = collection(db, 'nutrition_plans');
  
  const newPlan = {
    ...planData,
    generatedByAI: true,
    aiModelVersion: 'gpt-3.5-turbo',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  
  const docRef = await addDoc(planRef, newPlan);
  return { id: docRef.id, ...newPlan };
};

export const getUserNutritionPlans = async (userId) => {
  const plansRef = collection(db, 'nutrition_plans');
  const q = query(plansRef, where('userId', '==', userId));
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Food Database Operations
export const addFood = async (foodData) => {
  const foodRef = collection(db, 'foods');
  const docRef = await addDoc(foodRef, foodData);
  return { id: docRef.id, ...foodData };
};

export const searchFoods = async (category = null, isVegetarian = null) => {
  let q = collection(db, 'foods');
  
  if (category) {
    q = query(q, where('category', '==', category));
  }
  
  if (isVegetarian !== null) {
    q = query(q, where('vegetarian', '==', isVegetarian));
  }
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Workout Plans Collection Operations
export const createWorkoutPlan = async (workoutData) => {
  const workoutRef = collection(db, 'workout_plans');
  
  const newWorkout = {
    ...workoutData,
    createdAt: serverTimestamp()
  };
  
  const docRef = await addDoc(workoutRef, newWorkout);
  return { id: docRef.id, ...newWorkout };
};

// Appointments/Consultations Operations
export const createConsultation = async (consultationData) => {
  const consultRef = collection(db, 'consultations');
  
  const newConsultation = {
    ...consultationData,
    status: 'pending',
    createdAt: serverTimestamp()
  };
  
  const docRef = await addDoc(consultRef, newConsultation);
  return { id: docRef.id, ...newConsultation };
};

export const updateConsultationStatus = async (consultationId, newStatus) => {
  const consultRef = doc(db, 'consultations', consultationId);
  
  await updateDoc(consultRef, {
    status: newStatus,
    updatedAt: serverTimestamp()
  });
}; 