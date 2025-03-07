import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import { authOperations, firestoreOperations, userOperations } from '../lib/firebaseUtils';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const [isOffline, setIsOffline] = useState(false);
  const [error, setError] = useState(null);

  // Monitor online/offline status - only in browser
  useEffect(() => {
    // Skip on server-side
    if (typeof window === 'undefined') return;

    function handleOnline() {
      setIsOffline(false);
      setError(null);
    }
    
    function handleOffline() {
      setIsOffline(true);
      setError("You are currently offline. Some features may be limited.");
    }
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check initial state
    setIsOffline(!navigator.onLine);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Firebase auth state - only in browser
  useEffect(() => {
    // Skip on server-side
    if (typeof window === 'undefined') return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        try {
          // Create or get user profile
          const response = await userOperations.getUserProfile(user.uid);
          
          if (response.success) {
            setUser(user);
            setUserProfile(response.data);
            
            try {
              // Get user's nutrition plans
              const plansResponse = await firestoreOperations.queryDocuments(
                'nutrition_plans', 
                [{ field: 'userId', operator: '==', value: user.uid }]
              );
              
              if (plansResponse.success) {
                setPlans(plansResponse.data);
              } else {
                console.error("Error fetching plans:", plansResponse.errorMessage);
                setPlans([]);
              }
            } catch (error) {
              console.error("Error fetching plans:", error);
              setPlans([]);
              if (error.message?.includes('offline') || error.code === 'unavailable') {
                setIsOffline(true);
                setError("Unable to fetch your latest data because you're offline. Showing cached data.");
              }
            }
          } else {
            // Profile doesn't exist, create it
            try {
              const userData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || '',
                photoURL: user.photoURL || '',
                preferences: {
                  dietType: 'veg',
                  fitnessGoal: 'maintain',
                  targetCalories: 2000
                },
                metricsHistory: []
              };
              
              const createProfileResponse = await firestoreOperations.createDocumentWithId(
                'users', 
                user.uid, 
                userData
              );
              
              if (createProfileResponse.success) {
                setUser(user);
                setUserProfile(userData);
              } else {
                throw new Error(createProfileResponse.errorMessage);
              }
            } catch (error) {
              console.error("Error creating user profile:", error);
              setError("Error creating user profile. Please try again.");
            }
          }
        } catch (error) {
          console.error("Error setting up user profile:", error);
          if (error.message?.includes('offline') || error.code === 'unavailable') {
            setIsOffline(true);
            setError("You appear to be offline. Using cached user data.");
            // Still set the user so they can use the app in offline mode
            setUser(user);
          } else {
            setError("Error setting up user profile. Please try again.");
          }
        }
      } else {
        setUser(null);
        setUserProfile(null);
        setPlans([]);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    setError(null);
    if (isOffline) {
      setError("Cannot sign in while offline. Please check your internet connection.");
      return;
    }
    
    const response = await authOperations.signInWithGoogle();
    if (!response.success) {
      setError(response.userMessage || "Failed to sign in with Google. Please try again.");
    }
  };

  const logout = async () => {
    try {
      const response = await authOperations.logoutUser();
      if (!response.success) {
        setError(response.userMessage || "Error signing out. Please try again.");
      }
    } catch (error) {
      console.error("Error signing out:", error);
      setError("Error signing out. Please try again.");
    }
  };

  const updateUserPreferences = async (preferences) => {
    if (!user) return;
    
    try {
      const response = await userOperations.setUserPreferences(user.uid, preferences);
      if (response.success) {
        // Update local state
        setUserProfile(prev => ({
          ...prev,
          preferences: {
            ...prev.preferences,
            ...preferences
          }
        }));
        return { success: true };
      } else {
        setError(response.userMessage || "Failed to update preferences");
        return { success: false, error: response.userMessage };
      }
    } catch (error) {
      console.error("Error updating preferences:", error);
      setError("Error updating preferences. Please try again.");
      return { success: false, error: "Error updating preferences" };
    }
  };

  const updateUserMetrics = async (metrics) => {
    if (!user) return;
    
    try {
      const response = await userOperations.updateUserMetrics(user.uid, metrics);
      if (response.success) {
        // Update local state
        setUserProfile(prev => ({
          ...prev,
          metricsHistory: [...(prev.metricsHistory || []), { ...metrics, date: new Date() }]
        }));
        return { success: true };
      } else {
        setError(response.userMessage || "Failed to update metrics");
        return { success: false, error: response.userMessage };
      }
    } catch (error) {
      console.error("Error updating metrics:", error);
      setError("Error updating metrics. Please try again.");
      return { success: false, error: "Error updating metrics" };
    }
  };

  const value = {
    user,
    userProfile,
    plans,
    loading,
    isOffline,
    error,
    signInWithGoogle,
    logout,
    updateUserPreferences,
    updateUserMetrics,
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 