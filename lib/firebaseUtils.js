import {
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    GoogleAuthProvider,
    reauthenticateWithCredential,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateEmail,
    updatePassword,
    updateProfile,
} from 'firebase/auth';
import {
    addDoc,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    runTransaction,
    serverTimestamp,
    setDoc,
    startAfter,
    updateDoc,
    where,
    writeBatch
} from 'firebase/firestore';
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
    uploadBytesResumable,
} from 'firebase/storage';
import { auth, db, handleFirebaseError, storage } from './firebase';

// ===== Auth Operations =====
export const authOperations = {
    // Register a new user
    registerUser: async (email, password, displayName) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Update profile with display name
            await updateProfile(auth.currentUser, { displayName });
            
            // Send email verification
            await sendEmailVerification(auth.currentUser);
            
            // Create user document in Firestore
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                email,
                displayName,
                createdAt: serverTimestamp(),
                role: 'user',
                emailVerified: false,
            });
            
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Sign in existing user
    loginUser: async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Google Authentication
    signInWithGoogle: async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Sign out user
    logoutUser: async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Reset password
    resetPassword: async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return { success: true };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Update user email
    updateUserEmail: async (currentPassword, newEmail) => {
        try {
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            
            // Reauthenticate user before sensitive operations
            await reauthenticateWithCredential(user, credential);
            await updateEmail(user, newEmail);
            await sendEmailVerification(user);
            
            return { success: true };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Update user password
    updateUserPassword: async (currentPassword, newPassword) => {
        try {
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            
            // Reauthenticate user before sensitive operations
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            
            return { success: true };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },
};

// ===== User Data Operations =====
export const userOperations = {
    // Get user profile
    getUserProfile: async (userId) => {
        try {
            const docRef = doc(db, 'users', userId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
            } else {
                return { success: false, errorMessage: 'User profile not found' };
            }
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Update user profile
    updateUserProfile: async (userId, data) => {
        try {
            const docRef = doc(db, 'users', userId);
            await updateDoc(docRef, {
                ...data,
                updatedAt: serverTimestamp(),
            });
            
            // Update auth display name if provided
            if (data.displayName && auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName: data.displayName });
            }
            
            return { success: true };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Set user preferences
    setUserPreferences: async (userId, preferences) => {
        try {
            const docRef = doc(db, 'users', userId);
            await updateDoc(docRef, {
                preferences: {
                    ...preferences,
                    updatedAt: serverTimestamp(),
                },
            });
            
            return { success: true };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Update user metrics
    updateUserMetrics: async (userId, metrics) => {
        try {
            const docRef = doc(db, 'users', userId);
            await updateDoc(docRef, {
                metricsHistory: arrayUnion({
                    ...metrics,
                    date: serverTimestamp(),
                }),
            });
            
            return { success: true };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Subscribe to user profile changes (real-time)
    subscribeToUserProfile: (userId, callback) => {
        const docRef = doc(db, 'users', userId);
        return onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                callback({ success: true, data: { id: docSnap.id, ...docSnap.data() } });
            } else {
                callback({ success: false, errorMessage: 'User profile not found' });
            }
        }, (error) => {
            callback({ success: false, ...handleFirebaseError(error) });
        });
    },
};

// ===== Firestore Document Operations =====
export const firestoreOperations = {
    // Create document with auto-generated ID
    createDocument: async (collectionName, data) => {
        try {
            const docRef = await addDoc(collection(db, collectionName), {
                ...data,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Create document with specific ID
    createDocumentWithId: async (collectionName, docId, data) => {
        try {
            const docRef = doc(db, collectionName, docId);
            await setDoc(docRef, {
                ...data,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            return { success: true, id: docId };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Get document by ID
    getDocument: async (collectionName, docId) => {
        try {
            const docRef = doc(db, collectionName, docId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
            } else {
                return { success: false, errorMessage: 'Document not found' };
            }
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Update document
    updateDocument: async (collectionName, docId, data) => {
        try {
            const docRef = doc(db, collectionName, docId);
            await updateDoc(docRef, {
                ...data,
                updatedAt: serverTimestamp(),
            });
            return { success: true };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Delete document
    deleteDocument: async (collectionName, docId) => {
        try {
            const docRef = doc(db, collectionName, docId);
            await deleteDoc(docRef);
            return { success: true };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Query documents
    queryDocuments: async (collectionName, conditions = [], sortField = null, sortDirection = 'asc', limitCount = null, startAfterDoc = null) => {
        try {
            let queryRef = collection(db, collectionName);
            
            // Add where conditions
            if (conditions.length > 0) {
                conditions.forEach((condition) => {
                    queryRef = query(queryRef, where(condition.field, condition.operator, condition.value));
                });
            }
            
            // Add sorting
            if (sortField) {
                queryRef = query(queryRef, orderBy(sortField, sortDirection));
            }
            
            // Add pagination starting point
            if (startAfterDoc) {
                queryRef = query(queryRef, startAfter(startAfterDoc));
            }
            
            // Add limit
            if (limitCount) {
                queryRef = query(queryRef, limit(limitCount));
            }
            
            const querySnapshot = await getDocs(queryRef);
            const results = [];
            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
            
            querySnapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            
            return { 
                success: true, 
                data: results,
                lastDoc, // For pagination
                hasMore: querySnapshot.docs.length === limitCount
            };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Subscribe to a document (real-time)
    subscribeToDocument: (collectionName, docId, callback) => {
        const docRef = doc(db, collectionName, docId);
        return onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                callback({ success: true, data: { id: docSnap.id, ...docSnap.data() } });
            } else {
                callback({ success: false, errorMessage: 'Document not found' });
            }
        }, (error) => {
            callback({ success: false, ...handleFirebaseError(error) });
        });
    },

    // Subscribe to a query (real-time)
    subscribeToQuery: (collectionName, conditions = [], sortField = null, sortDirection = 'asc', limitCount = null, callback) => {
        let queryRef = collection(db, collectionName);
        
        // Add where conditions
        if (conditions.length > 0) {
            conditions.forEach((condition) => {
                queryRef = query(queryRef, where(condition.field, condition.operator, condition.value));
            });
        }
        
        // Add sorting
        if (sortField) {
            queryRef = query(queryRef, orderBy(sortField, sortDirection));
        }
        
        // Add limit
        if (limitCount) {
            queryRef = query(queryRef, limit(limitCount));
        }
        
        return onSnapshot(queryRef, (querySnapshot) => {
            const results = [];
            querySnapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            
            callback({ success: true, data: results });
        }, (error) => {
            callback({ success: false, ...handleFirebaseError(error) });
        });
    },

    // Batch write - perform multiple writes in a single atomic operation
    batchWrite: async (operations) => {
        try {
            const batch = writeBatch(db);
            
            operations.forEach((operation) => {
                const docRef = doc(db, operation.collection, operation.docId);
                
                switch (operation.type) {
                    case 'set':
                        batch.set(docRef, {
                            ...operation.data,
                            createdAt: serverTimestamp(),
                            updatedAt: serverTimestamp(),
                        });
                        break;
                    case 'update':
                        batch.update(docRef, {
                            ...operation.data,
                            updatedAt: serverTimestamp(),
                        });
                        break;
                    case 'delete':
                        batch.delete(docRef);
                        break;
                    default:
                        throw new Error(`Invalid operation type: ${operation.type}`);
                }
            });
            
            await batch.commit();
            return { success: true };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Transaction - perform reads and writes in a single atomic operation
    runTransaction: async (callback) => {
        try {
            const result = await runTransaction(db, callback);
            return { success: true, data: result };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },
};

// ===== Storage Operations =====
export const storageOperations = {
    // Upload file to storage
    uploadFile: async (path, file, progressCallback = null) => {
        try {
            const storageRef = ref(storage, path);
            
            if (progressCallback) {
                // Upload with progress monitoring
                const uploadTask = uploadBytesResumable(storageRef, file);
                
                uploadTask.on('state_changed', 
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        progressCallback(progress);
                    }
                );
                
                await uploadTask;
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                
                return { 
                    success: true,
                    url: downloadURL,
                    path: uploadTask.snapshot.ref.fullPath
                };
            } else {
                // Simple upload without progress monitoring
                const snapshot = await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(snapshot.ref);
                
                return { 
                    success: true,
                    url: downloadURL,
                    path: snapshot.ref.fullPath
                };
            }
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Delete file from storage
    deleteFile: async (path) => {
        try {
            const storageRef = ref(storage, path);
            await deleteObject(storageRef);
            return { success: true };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },

    // Get file download URL
    getFileUrl: async (path) => {
        try {
            const storageRef = ref(storage, path);
            const url = await getDownloadURL(storageRef);
            return { success: true, url };
        } catch (error) {
            return { success: false, ...handleFirebaseError(error) };
        }
    },
};

// Export individual operations or use unified object
export default {
    auth: authOperations,
    user: userOperations,
    firestore: firestoreOperations,
    storage: storageOperations,
}; 