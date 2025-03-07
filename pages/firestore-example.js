import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { createDocument } from '../lib/firebaseUtils';

export default function FirestoreExample() {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Method 1: Using direct Firestore methods as shown in the guide
  const addUserDirectMethod = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Validate input
      if (!firstName || !lastName || !birthYear) {
        setMessage('First name, last name, and birth year are required.');
        setLoading(false);
        return;
      }

      // Create user data object
      const userData = {
        first: firstName,
        last: lastName,
        born: parseInt(birthYear, 10)
      };
      
      // Add middle name only if provided
      if (middleName) {
        userData.middle = middleName;
      }

      // Add document to Firestore
      const docRef = await addDoc(collection(db, "users"), userData);
      
      console.log("Document written with ID: ", docRef.id);
      setMessage(`User added successfully with ID: ${docRef.id}`);
      
      // Clear form and refresh users list
      clearForm();
      fetchUsers();
    } catch (e) {
      console.error("Error adding document: ", e);
      setMessage(`Error adding user: ${e.message}`);
    }
    
    setLoading(false);
  };

  // Method 2: Using our utility functions
  const addUserUtilityMethod = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Validate input
      if (!firstName || !lastName || !birthYear) {
        setMessage('First name, last name, and birth year are required.');
        setLoading(false);
        return;
      }

      // Create user data object
      const userData = {
        first: firstName,
        last: lastName,
        born: parseInt(birthYear, 10)
      };
      
      // Add middle name only if provided
      if (middleName) {
        userData.middle = middleName;
      }

      // Use our utility function to add the document
      const result = await createDocument("users", userData);
      
      if (result.success) {
        setMessage(`User added successfully with ID: ${result.id}`);
        // Clear form and refresh users list
        clearForm();
        fetchUsers();
      } else {
        setMessage(`Error adding user: ${result.errorMessage}`);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      setMessage(`Error adding user: ${e.message}`);
    }
    
    setLoading(false);
  };

  // Fetch all users from the "users" collection
  const fetchUsers = async () => {
    try {
      // Method 1: Using direct Firestore methods as shown in the guide
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = [];
      
      querySnapshot.forEach((doc) => {
        usersList.push({
          id: doc.id,
          ...doc.data()
        });
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
      
      setUsers(usersList);
      
      // Method 2 (commented out): Using our utility function
      // const result = await queryDocuments("users");
      // if (result.success) {
      //   setUsers(result.data);
      // }
    } catch (e) {
      console.error("Error fetching users: ", e);
      setMessage(`Error fetching users: ${e.message}`);
    }
  };

  // Clear form fields
  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setBirthYear('');
    setMiddleName('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Firestore Example</h1>
      
      <div className="mb-8 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Add a New User</h2>
        
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name*</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Middle Name</label>
              <input
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Last Name*</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Birth Year*</label>
              <input
                type="number"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={addUserDirectMethod}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Add User (Direct Method)
            </button>
            <button
              onClick={addUserUtilityMethod}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              Add User (Utility Method)
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
        <h2 className="text-xl font-semibold p-6 border-b">User List</h2>
        
        {users.length === 0 ? (
          <p className="p-6 text-gray-500">No users found. Add some users to see them here.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Middle Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Birth Year</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id.substring(0, 8)}...</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.first}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.middle || '—'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.last}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.born}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="p-4 border-t">
          <button 
            onClick={fetchUsers}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Refresh Users
          </button>
        </div>
      </div>
    </div>
  );
} 