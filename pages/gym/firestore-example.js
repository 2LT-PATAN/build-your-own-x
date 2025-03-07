import { addDoc, collection, getDocs, query, Timestamp, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { createDocument } from '../../lib/firebaseUtils';

export default function GymFirestoreExample() {
  const [workouts, setWorkouts] = useState([]);
  const [workoutName, setWorkoutName] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Mock user ID - in a real app, this would come from authentication
  const mockUserId = "user123";

  // Fetch workouts on component mount
  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Method 1: Using direct Firestore methods
  const addWorkoutDirectMethod = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Validate input
      if (!workoutName || !duration || !difficulty) {
        setMessage('Workout name, duration, and difficulty are required.');
        setLoading(false);
        return;
      }

      // Create workout data object
      const workoutData = {
        name: workoutName,
        duration: parseInt(duration, 10),
        difficulty: difficulty,
        description: description || '',
        userId: mockUserId,
        createdAt: Timestamp.now(),
        exercises: []
      };

      // Add document to Firestore
      const docRef = await addDoc(collection(db, "gym_workouts"), workoutData);
      
      console.log("Workout added with ID: ", docRef.id);
      setMessage(`Workout added successfully with ID: ${docRef.id}`);
      
      // Clear form and refresh workouts list
      clearForm();
      fetchWorkouts();
    } catch (e) {
      console.error("Error adding workout: ", e);
      setMessage(`Error adding workout: ${e.message}`);
    }
    
    setLoading(false);
  };

  // Method 2: Using our utility functions
  const addWorkoutUtilityMethod = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Validate input
      if (!workoutName || !duration || !difficulty) {
        setMessage('Workout name, duration, and difficulty are required.');
        setLoading(false);
        return;
      }

      // Create workout data object
      const workoutData = {
        name: workoutName,
        duration: parseInt(duration, 10),
        difficulty: difficulty,
        description: description || '',
        userId: mockUserId,
        exercises: []
      };

      // Use our utility function to add the document
      const result = await createDocument("gym_workouts", workoutData);
      
      if (result.success) {
        setMessage(`Workout added successfully with ID: ${result.id}`);
        // Clear form and refresh workouts list
        clearForm();
        fetchWorkouts();
      } else {
        setMessage(`Error adding workout: ${result.errorMessage}`);
      }
    } catch (e) {
      console.error("Error adding workout: ", e);
      setMessage(`Error adding workout: ${e.message}`);
    }
    
    setLoading(false);
  };

  // Fetch all workouts from the "gym_workouts" collection for this user
  const fetchWorkouts = async () => {
    try {
      // Method 1: Using direct Firestore methods with query
      const q = query(
        collection(db, "gym_workouts"), 
        where("userId", "==", mockUserId)
      );
      
      const querySnapshot = await getDocs(q);
      const workoutsList = [];
      
      querySnapshot.forEach((doc) => {
        workoutsList.push({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore Timestamp to readable date
          createdAt: doc.data().createdAt ? 
            new Date(doc.data().createdAt.toMillis()).toLocaleString() : 
            'Unknown'
        });
      });
      
      setWorkouts(workoutsList);
      
      // Method 2 (commented out): Using our utility function
      // const conditions = [{ field: 'userId', operator: '==', value: mockUserId }];
      // const result = await queryDocuments("gym_workouts", conditions);
      // if (result.success) {
      //   const formattedWorkouts = result.data.map(workout => ({
      //     ...workout,
      //     createdAt: workout.createdAt ? 
      //       new Date(workout.createdAt.toMillis()).toLocaleString() : 
      //       'Unknown'
      //   }));
      //   setWorkouts(formattedWorkouts);
      // }
    } catch (e) {
      console.error("Error fetching workouts: ", e);
      setMessage(`Error fetching workouts: ${e.message}`);
    }
  };

  // Clear form fields
  const clearForm = () => {
    setWorkoutName('');
    setDuration('');
    setDifficulty('intermediate');
    setDescription('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gym Firestore Example</h1>
      
      <div className="mb-8 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Add a New Workout</h2>
        
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Workout Name*</label>
              <input
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="e.g., Full Body HIIT"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Duration (minutes)*</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="30"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Difficulty*</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                rows="3"
                placeholder="Describe the workout..."
              ></textarea>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={addWorkoutDirectMethod}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Add Workout (Direct Method)
            </button>
            <button
              onClick={addWorkoutUtilityMethod}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              Add Workout (Utility Method)
            </button>
            <button
              onClick={(e) => { e.preventDefault(); clearForm(); }}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Clear Form
            </button>
          </div>
        </form>
        
        {message && (
          <div className={`mt-4 p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}
      </div>
      
      <div className="bg-white rounded shadow overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b">Your Workouts</h2>
        
        {workouts.length === 0 ? (
          <p className="p-6 text-gray-500">No workouts found. Add your first workout to get started.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workout Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {workouts.map((workout) => (
                  <tr key={workout.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{workout.name}</div>
                      {workout.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">{workout.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{workout.duration} min</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${workout.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : 
                          workout.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{workout.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="p-4 border-t">
          <button 
            onClick={fetchWorkouts}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Refresh Workouts
          </button>
        </div>
      </div>
    </div>
  );
} 