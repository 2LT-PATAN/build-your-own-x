import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function NutritionForm() {
  const router = useRouter();
  const { user, userProfile } = useAuth();
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activityLevel: userProfile?.preferences?.activityLevel || 'moderate',
    goal: userProfile?.preferences?.fitnessGoal || 'weight-loss',
    dietType: userProfile?.preferences?.dietType || 'veg'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to generate a nutrition plan');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          userDetails: {
            age: parseInt(formData.age),
            weight: parseInt(formData.weight),
            height: parseInt(formData.height),
            gender: formData.gender,
            activityLevel: formData.activityLevel
          },
          dietType: formData.dietType,
          goal: formData.goal
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate nutrition plan');
      }

      const data = await response.json();
      setSuccess(true);
      
      // Redirect to the newly created plan after a short delay
      setTimeout(() => {
        router.push(`/plan/${data.plan.id}`);
      }, 1500);
      
    } catch (error) {
      console.error('Error generating plan:', error);
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Create Your Nutrition Plan</h2>
      
      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
          <div className="flex">
            <i className="ri-error-warning-line mr-2 text-red-500"></i>
            <span>{error}</span>
          </div>
        </div>
      )}
      
      {success && (
        <div className="bg-green-900/30 border border-green-500 text-green-300 px-4 py-3 rounded mb-4">
          <div className="flex">
            <i className="ri-check-line mr-2 text-green-500"></i>
            <span>Your nutrition plan has been successfully generated!</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-300 mb-1">Age</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <i className="ri-user-3-line"></i>
              </span>
              <input 
                type="number" 
                required 
                className="pl-10 mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-primary focus:ring-primary"
                value={formData.age} 
                onChange={e => setFormData({...formData, age: e.target.value})}
                placeholder="Your age"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-300 mb-1">Weight (kg)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <i className="ri-scales-line"></i>
              </span>
              <input 
                type="number" 
                required 
                className="pl-10 mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-primary focus:ring-primary"
                value={formData.weight} 
                onChange={e => setFormData({...formData, weight: e.target.value})}
                placeholder="Your weight in kg"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-300 mb-1">Height (cm)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <i className="ri-ruler-line"></i>
              </span>
              <input 
                type="number" 
                required 
                className="pl-10 mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-primary focus:ring-primary"
                value={formData.height} 
                onChange={e => setFormData({...formData, height: e.target.value})}
                placeholder="Your height in cm"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <i className="ri-user-settings-line"></i>
              </span>
              <select 
                className="pl-10 mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-primary focus:ring-primary"
                value={formData.gender} 
                onChange={e => setFormData({...formData, gender: e.target.value})}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-300 mb-1">Activity Level</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <i className="ri-run-line"></i>
              </span>
              <select 
                className="pl-10 mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-primary focus:ring-primary"
                value={formData.activityLevel} 
                onChange={e => setFormData({...formData, activityLevel: e.target.value})}
              >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (exercise 1-3 days/week)</option>
                <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                <option value="active">Active (exercise 6-7 days/week)</option>
                <option value="very-active">Very Active (intense exercise daily)</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-300 mb-1">Goal</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <i className="ri-flag-line"></i>
              </span>
              <select 
                className="pl-10 mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-primary focus:ring-primary"
                value={formData.goal} 
                onChange={e => setFormData({...formData, goal: e.target.value})}
              >
                <option value="weight-loss">Weight Loss</option>
                <option value="weight-gain">Weight Gain</option>
                <option value="maintain">Maintenance</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-300 mb-1">Diet Type</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <i className="ri-restaurant-line"></i>
              </span>
              <select 
                className="pl-10 mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-primary focus:ring-primary"
                value={formData.dietType} 
                onChange={e => setFormData({...formData, dietType: e.target.value})}
              >
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
                <option value="both">Both</option>
                <option value="vegan">Vegan</option>
                <option value="keto">Keto</option>
                <option value="paleo">Paleo</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button 
            type="submit" 
            className="w-full flex items-center justify-center bg-primary text-white py-3 px-4 rounded-button hover:bg-primary/90 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="ri-loader-2-line animate-spin mr-2"></i>
                Generating...
              </>
            ) : (
              <>
                <i className="ri-magic-line mr-2"></i>
                Generate Nutrition Plan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 