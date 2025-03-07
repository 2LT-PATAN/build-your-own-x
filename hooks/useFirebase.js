import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { firestoreOperations, storageOperations, userOperations } from '../lib/firebaseUtils';

// Hook for real-time document data
export function useDocument(collectionName, documentId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collectionName || !documentId) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    const unsubscribe = firestoreOperations.subscribeToDocument(
      collectionName,
      documentId,
      (result) => {
        if (result.success) {
          setData(result.data);
          setError(null);
        } else {
          setData(null);
          setError(result.errorMessage || 'Failed to load document');
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, documentId]);

  return { data, loading, error };
}

// Hook for real-time query results
export function useQuery(collectionName, conditions = [], sortField = null, sortDirection = 'asc', limitCount = null) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collectionName) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    const unsubscribe = firestoreOperations.subscribeToQuery(
      collectionName,
      conditions,
      sortField,
      sortDirection,
      limitCount,
      (result) => {
        if (result.success) {
          setData(result.data);
          setError(null);
        } else {
          setData([]);
          setError(result.errorMessage || 'Failed to load data');
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, JSON.stringify(conditions), sortField, sortDirection, limitCount]);

  return { data, loading, error };
}

// Hook for nutrition plans
export function useNutritionPlans() {
  const { user, isOffline } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch nutrition plans
  useEffect(() => {
    if (!user) {
      setPlans([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    const unsubscribe = firestoreOperations.subscribeToQuery(
      'nutrition_plans',
      [{ field: 'userId', operator: '==', value: user.uid }],
      'createdAt',
      'desc',
      null,
      (result) => {
        if (result.success) {
          setPlans(result.data);
          setError(null);
        } else {
          setPlans([]);
          if (isOffline) {
            setError('You are offline. Showing cached data if available.');
          } else {
            setError(result.errorMessage || 'Failed to load nutrition plans');
          }
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, isOffline]);

  // Create a new nutrition plan
  const createPlan = async (planData) => {
    if (!user) return { success: false, error: 'You must be logged in' };
    
    try {
      const response = await firestoreOperations.createDocument('nutrition_plans', {
        ...planData,
        userId: user.uid
      });
      
      return response;
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Failed to create nutrition plan' 
      };
    }
  };

  // Delete a nutrition plan
  const deletePlan = async (planId) => {
    if (!user) return { success: false, error: 'You must be logged in' };
    
    try {
      return await firestoreOperations.deleteDocument('nutrition_plans', planId);
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Failed to delete nutrition plan' 
      };
    }
  };

  return { 
    plans, 
    loading, 
    error, 
    createPlan,
    deletePlan 
  };
}

// Hook for workout plans
export function useWorkoutPlans() {
  const { user, isOffline } = useAuth();
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch workout plans
  useEffect(() => {
    if (!user) {
      setWorkoutPlans([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    const unsubscribe = firestoreOperations.subscribeToQuery(
      'workout_plans',
      [{ field: 'userId', operator: '==', value: user.uid }],
      'createdAt',
      'desc',
      null,
      (result) => {
        if (result.success) {
          setWorkoutPlans(result.data);
          setError(null);
        } else {
          setWorkoutPlans([]);
          if (isOffline) {
            setError('You are offline. Showing cached data if available.');
          } else {
            setError(result.errorMessage || 'Failed to load workout plans');
          }
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, isOffline]);

  // Create a new workout plan
  const createWorkoutPlan = async (planData) => {
    if (!user) return { success: false, error: 'You must be logged in' };
    
    try {
      const response = await firestoreOperations.createDocument('workout_plans', {
        ...planData,
        userId: user.uid
      });
      
      return response;
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Failed to create workout plan' 
      };
    }
  };

  // Delete a workout plan
  const deleteWorkoutPlan = async (planId) => {
    if (!user) return { success: false, error: 'You must be logged in' };
    
    try {
      return await firestoreOperations.deleteDocument('workout_plans', planId);
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Failed to delete workout plan' 
      };
    }
  };

  return { 
    workoutPlans, 
    loading, 
    error, 
    createWorkoutPlan,
    deleteWorkoutPlan 
  };
}

// Hook for file uploads
export function useFileUpload() {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const uploadFile = async (file, path = null) => {
    if (!user) return { success: false, error: 'You must be logged in' };
    if (!file) return { success: false, error: 'No file provided' };
    
    try {
      setUploading(true);
      setProgress(0);
      setError(null);

      // Create a unique path if not provided
      const filePath = path || `uploads/${user.uid}/${Date.now()}_${file.name}`;
      
      const result = await storageOperations.uploadFile(
        filePath, 
        file,
        (progressValue) => setProgress(progressValue)
      );
      
      setUploading(false);
      
      return result;
    } catch (error) {
      setUploading(false);
      setError(error.message || 'Failed to upload file');
      return { 
        success: false, 
        error: error.message || 'Failed to upload file' 
      };
    }
  };

  return { uploadFile, uploading, progress, error };
}

// Hook for user profile
export function useUserProfile() {
  const { user, userProfile, updateUserPreferences, updateUserMetrics } = useAuth();
  
  const updateProfile = async (profileData) => {
    if (!user) return { success: false, error: 'You must be logged in' };
    
    try {
      const response = await userOperations.updateUserProfile(user.uid, profileData);
      return response;
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Failed to update profile' 
      };
    }
  };
  
  return {
    profile: userProfile,
    updateProfile,
    updatePreferences: updateUserPreferences,
    updateMetrics: updateUserMetrics
  };
} 