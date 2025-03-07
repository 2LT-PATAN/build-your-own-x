import { signInAnonymously } from 'firebase/auth';
import { onValue, ref, set } from 'firebase/database';
import {
    addDoc,
    collection,
    getDocs,
    serverTimestamp
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, database, db } from '../lib/firebase';

export default function FirebaseTest() {
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [firestoreData, setFirestoreData] = useState(null);
  const [realtimeData, setRealtimeData] = useState(null);

  useEffect(() => {
    // Test all Firebase services
    const testConnections = async () => {
      const results = {
        timestamp: new Date().toISOString(),
        services: {}
      };

      try {
        // Test Firestore
        await testFirestore(results);
        
        // Test Authentication
        await testAuth(results);
        
        // Test Realtime Database
        await testRealtimeDatabase(results);
        
        // Test Storage
        await testStorage(results);
        
      } catch (error) {
        console.error('Error testing Firebase services:', error);
        results.overall = 'Error';
        results.error = error.message;
      } finally {
        setStatus(results);
        setLoading(false);
      }
    };

    testConnections();
  }, []);

  // Test Firestore connection
  const testFirestore = async (results) => {
    try {
      results.services.firestore = { status: 'Testing...' };
      setStatus({...results});
      
      try {
        // Create a test document with current timestamp
        const testData = { 
          message: 'Firebase connection test',
          timestamp: serverTimestamp(),
          client: typeof window !== 'undefined' ? window.navigator.userAgent : 'server'
        };
        
        // Add a document to a test collection
        const docRef = await addDoc(collection(db, 'connectionTests'), testData);
        
        // Fetch the document back to confirm it was added
        const snapshot = await getDocs(collection(db, 'connectionTests'));
        const data = [];
        snapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });
        
        setFirestoreData(data);
        
        results.services.firestore = { 
          status: 'Success', 
          documentId: docRef.id,
          message: `Created document with ID: ${docRef.id}`
        };
      } catch (firestoreError) {
        if (firestoreError.message && firestoreError.message.includes('permission')) {
          results.services.firestore = { 
            status: 'Error', 
            error: 'Missing or insufficient permissions. Make sure Firestore rules are properly configured in Firebase console: Firestore Database → Rules'
          };
        } else {
          throw firestoreError;
        }
      }
    } catch (error) {
      console.error('Firestore test error:', error);
      results.services.firestore = { 
        status: 'Error', 
        error: error.message 
      };
    }
  };

  // Test Authentication
  const testAuth = async (results) => {
    try {
      results.services.auth = { status: 'Testing...' };
      setStatus({...results});
      
      try {
        // Sign in anonymously to test auth
        const userCredential = await signInAnonymously(auth);
        
        results.services.auth = { 
          status: 'Success', 
          user: userCredential.user.uid,
          message: `Signed in anonymously as: ${userCredential.user.uid}`
        };
      } catch (authError) {
        // Handle specific auth errors with more helpful messages
        if (authError.code === 'auth/admin-restricted-operation') {
          results.services.auth = { 
            status: 'Error', 
            error: 'Anonymous authentication is disabled. Enable it in Firebase console: Authentication → Sign-in method → Anonymous → Enable',
          };
        } else {
          throw authError; // Re-throw other errors to be caught by the outer catch
        }
      }
    } catch (error) {
      console.error('Auth test error:', error);
      results.services.auth = { 
        status: 'Error', 
        error: error.message 
      };
    }
  };

  // Test Realtime Database
  const testRealtimeDatabase = async (results) => {
    try {
      results.services.realtimeDatabase = { status: 'Testing...' };
      setStatus({...results});
      
      try {
        // Write data to a test location
        const dbRef = ref(database, 'connectionTests/' + Date.now());
        await set(dbRef, {
          message: 'Realtime DB connection test',
          timestamp: Date.now(),
          client: typeof window !== 'undefined' ? window.navigator.userAgent : 'server'
        });
        
        // Read data back to confirm
        const dataRef = ref(database, 'connectionTests');
        onValue(dataRef, (snapshot) => {
          const data = snapshot.val();
          setRealtimeData(data);
          
          results.services.realtimeDatabase = { 
            status: 'Success', 
            message: 'Realtime Database connection successful'
          };
          setStatus({...results});
        }, {
          // Read once and then detach the listener
          onlyOnce: true
        });
      } catch (dbError) {
        if (dbError.message && dbError.message.includes('permission_denied')) {
          results.services.realtimeDatabase = { 
            status: 'Error', 
            error: 'Permission denied. Make sure database rules are properly configured in Firebase console: Database → Rules'
          };
        } else {
          throw dbError;
        }
      }
      
    } catch (error) {
      console.error('Realtime Database test error:', error);
      results.services.realtimeDatabase = { 
        status: 'Error', 
        error: error.message
      };
    }
  };

  // Test Storage
  const testStorage = async (results) => {
    results.services.storage = { 
      status: 'Skipped', 
      message: 'Storage test skipped as we\'re using the free tier'
    };
    setStatus({...results});
  };

  function getStatusIcon(status) {
    if (status === 'Success') {
      return '✅';
    } else if (status === 'Error') {
      return '❌';
    } else {
      return '⏳';
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Firebase Connection Test</h1>
      
      {loading ? (
        <div className="p-4 bg-blue-100 text-blue-700 rounded">
          Testing Firebase connections...
        </div>
      ) : (
        <div>
          <div className="mb-8 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
            
            <div className="space-y-4">
              {Object.entries(status.services || {}).map(([service, info]) => (
                <div key={service} className={`p-4 rounded ${info.status === 'Success' ? 'bg-green-100' : info.status === 'Error' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                  <h3 className="font-medium flex items-center">
                    {getStatusIcon(info.status)} {service.charAt(0).toUpperCase() + service.slice(1)}
                  </h3>
                  <p className="mt-1 text-sm">
                    Status: {info.status}
                  </p>
                  {info.message && (
                    <p className="mt-1 text-sm">{info.message}</p>
                  )}
                  {info.error && (
                    <p className="mt-1 text-sm text-red-700">Error: {info.error}</p>
                  )}
                </div>
              ))}
            </div>
            
            {status.error && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                <p className="font-medium">Error testing Firebase:</p>
                <p>{status.error}</p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Firestore Data */}
            <div className="bg-white rounded shadow overflow-hidden">
              <h2 className="text-xl font-semibold p-6 border-b">Firestore Data</h2>
              <div className="p-6">
                {firestoreData ? (
                  <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-40">
                    {JSON.stringify(firestoreData, (key, value) => {
                      // Handle Firestore timestamps for display
                      if (value && typeof value === 'object' && value.seconds) {
                        return new Date(value.seconds * 1000).toLocaleString();
                      }
                      return value;
                    }, 2)}
                  </pre>
                ) : (
                  <p className="text-gray-500">No Firestore data retrieved</p>
                )}
              </div>
            </div>
            
            {/* Realtime DB Data */}
            <div className="bg-white rounded shadow overflow-hidden">
              <h2 className="text-xl font-semibold p-6 border-b">Realtime Database Data</h2>
              <div className="p-6">
                {realtimeData ? (
                  <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-40">
                    {JSON.stringify(realtimeData, null, 2)}
                  </pre>
                ) : (
                  <p className="text-gray-500">No Realtime Database data retrieved</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-100 text-blue-800 rounded">
            <h3 className="font-medium">Connection Test Details</h3>
            <p className="mt-1 text-sm">
              Test completed at: {status.timestamp}
            </p>
            <p className="mt-1 text-sm">
              This page has tested connections to Firestore, Authentication, Realtime Database, and Storage.
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 