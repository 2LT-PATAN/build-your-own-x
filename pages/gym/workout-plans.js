import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';

export default function WorkoutPlans() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    fitnessLevel: 'beginner',
    goal: 'strength',
    workoutDays: 3,
    timePerSession: 60,
    preferredExercises: [],
    equipment: 'full-gym',
    limitations: ''
  });
  const [formStep, setFormStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const goals = [
    { id: 'strength', name: 'Strength Building', icon: 'ri-muscle-line' },
    { id: 'weight-loss', name: 'Weight Loss', icon: 'ri-scales-line' },
    { id: 'endurance', name: 'Endurance', icon: 'ri-run-line' },
    { id: 'flexibility', name: 'Flexibility', icon: 'ri-yoga-line' },
    { id: 'muscle-gain', name: 'Muscle Gain', icon: 'ri-body-scan-line' },
    { id: 'maintenance', name: 'Maintenance', icon: 'ri-heart-pulse-line' },
  ];

  const equipmentOptions = [
    { id: 'full-gym', name: 'Full Gym Access', icon: 'ri-community-line' },
    { id: 'home-basic', name: 'Basic Home Equipment', icon: 'ri-home-4-line' },
    { id: 'bodyweight', name: 'Bodyweight Only', icon: 'ri-user-line' },
    { id: 'resistance-bands', name: 'Resistance Bands', icon: 'ri-loop-right-line' },
  ];

  const handleNextStep = () => {
    if (formStep === 1) {
      if (!formData.age || !formData.weight || !formData.height) {
        setError('Please fill in all required fields');
        return;
      }
    }
    
    setError('');
    setFormStep(formStep + 1);
  };

  const handlePrevStep = () => {
    setFormStep(formStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to generate a workout plan');
      return;
    }

    setSubmitting(true);
    setError('');
    
    try {
      // This would be replaced with actual API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      
      // After success, redirect to workout plan details
      setTimeout(() => {
        router.push('/gym/workout-plan-details?new=true');
      }, 1500);
      
    } catch (error) {
      console.error('Error generating workout plan:', error);
      setError(error.message || 'Failed to generate workout plan');
    } finally {
      setSubmitting(false);
    }
  };

  const handleExerciseToggle = (exercise) => {
    setFormData(prev => {
      const currentExercises = [...prev.preferredExercises];
      if (currentExercises.includes(exercise)) {
        return {
          ...prev,
          preferredExercises: currentExercises.filter(ex => ex !== exercise)
        };
      } else {
        return {
          ...prev,
          preferredExercises: [...currentExercises, exercise]
        };
      }
    });
  };

  return (
    <Layout title="AI Workout Planner">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link href="/gym" className="mr-2 text-gray-400 hover:text-white">
            <i className="ri-arrow-left-line"></i> Back to Gym Homepage
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">AI Workout Planner</h1>
        <p className="text-gray-400">
          Create your personalized workout plan based on your goals and preferences
        </p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : !user ? (
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 text-center">
          <div className="mx-auto w-16 h-16 mb-4 bg-gray-700 rounded-full flex items-center justify-center">
            <i className="ri-lock-line text-3xl text-primary"></i>
          </div>
          <h3 className="text-xl font-semibold mb-4">Authentication Required</h3>
          <p className="mb-6 text-gray-400">Please sign in to create a workout plan</p>
          <Link href="/" className="bg-primary text-white py-2 px-6 rounded-button hover:bg-primary/90 inline-block">
            Go to Login
          </Link>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-100">Create Your Workout Plan</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 1 ? 'bg-primary text-white' : 'bg-gray-700'}`}>1</div>
                <div className={`w-16 h-1 ${formStep >= 2 ? 'bg-primary' : 'bg-gray-700'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 2 ? 'bg-primary text-white' : 'bg-gray-700'}`}>2</div>
                <div className={`w-16 h-1 ${formStep >= 3 ? 'bg-primary' : 'bg-gray-700'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 3 ? 'bg-primary text-white' : 'bg-gray-700'}`}>3</div>
              </div>
            </div>
            
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
                  <span>Your workout plan has been successfully generated!</span>
                </div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit}>
            {formStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Basic Information</h3>
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
                </div>
                
                <div className="pt-4">
                  <button 
                    type="button" 
                    onClick={handleNextStep}
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-button font-medium transition"
                  >
                    Next <i className="ri-arrow-right-line ml-1"></i>
                  </button>
                </div>
              </div>
            )}
            
            {formStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Fitness Goals</h3>
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-300">Select your primary fitness goal:</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {goals.map(goal => (
                      <div 
                        key={goal.id}
                        onClick={() => setFormData({...formData, goal: goal.id})}
                        className={`cursor-pointer p-4 rounded-lg border ${
                          formData.goal === goal.id 
                            ? 'border-primary bg-primary/10' 
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                            formData.goal === goal.id ? 'bg-primary/20' : 'bg-gray-700'
                          }`}>
                            <i className={`${goal.icon} text-xl ${formData.goal === goal.id ? 'text-primary' : 'text-gray-400'}`}></i>
                          </div>
                          <span className={formData.goal === goal.id ? 'text-primary font-medium' : 'text-gray-300'}>
                            {goal.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-300">Your fitness level:</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, fitnessLevel: 'beginner'})}
                      className={`py-2 px-4 rounded-button border ${
                        formData.fitnessLevel === 'beginner' 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-gray-700 text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      Beginner
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, fitnessLevel: 'intermediate'})}
                      className={`py-2 px-4 rounded-button border ${
                        formData.fitnessLevel === 'intermediate' 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-gray-700 text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      Intermediate
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, fitnessLevel: 'advanced'})}
                      className={`py-2 px-4 rounded-button border ${
                        formData.fitnessLevel === 'advanced' 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-gray-700 text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      Advanced
                    </button>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between">
                  <button 
                    type="button" 
                    onClick={handlePrevStep}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-button font-medium transition"
                  >
                    <i className="ri-arrow-left-line mr-1"></i> Back
                  </button>
                  <button 
                    type="button" 
                    onClick={handleNextStep}
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-button font-medium transition"
                  >
                    Next <i className="ri-arrow-right-line ml-1"></i>
                  </button>
                </div>
              </div>
            )}
            
            {formStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Workout Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Days Per Week</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <i className="ri-calendar-line"></i>
                      </span>
                      <select 
                        className="pl-10 mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-primary focus:ring-primary"
                        value={formData.workoutDays} 
                        onChange={e => setFormData({...formData, workoutDays: parseInt(e.target.value)})}
                      >
                        {[1, 2, 3, 4, 5, 6, 7].map(days => (
                          <option key={days} value={days}>{days} {days === 1 ? 'day' : 'days'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Time Per Session (minutes)</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <i className="ri-time-line"></i>
                      </span>
                      <select 
                        className="pl-10 mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-primary focus:ring-primary"
                        value={formData.timePerSession} 
                        onChange={e => setFormData({...formData, timePerSession: parseInt(e.target.value)})}
                      >
                        {[15, 30, 45, 60, 75, 90].map(time => (
                          <option key={time} value={time}>{time} minutes</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-300">Available Equipment:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {equipmentOptions.map(option => (
                      <div 
                        key={option.id}
                        onClick={() => setFormData({...formData, equipment: option.id})}
                        className={`cursor-pointer p-3 rounded-lg border ${
                          formData.equipment === option.id 
                            ? 'border-primary bg-primary/10' 
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                            formData.equipment === option.id ? 'bg-primary/20' : 'bg-gray-700'
                          }`}>
                            <i className={`${option.icon} text-xl ${formData.equipment === option.id ? 'text-primary' : 'text-gray-400'}`}></i>
                          </div>
                          <span className={formData.equipment === option.id ? 'text-primary font-medium' : 'text-gray-300'}>
                            {option.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Do you have any limitations or injuries? (Optional)
                  </label>
                  <textarea
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-primary focus:ring-primary"
                    rows="3"
                    placeholder="E.g., knee injury, lower back pain, etc."
                    value={formData.limitations}
                    onChange={e => setFormData({...formData, limitations: e.target.value})}
                  ></textarea>
                </div>
                
                <div className="pt-4 flex justify-between">
                  <button 
                    type="button" 
                    onClick={handlePrevStep}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-button font-medium transition"
                  >
                    <i className="ri-arrow-left-line mr-1"></i> Back
                  </button>
                  <button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded-button font-medium transition flex items-center"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <i className="ri-loader-2-line animate-spin mr-2"></i>
                        Generating...
                      </>
                    ) : (
                      <>
                        <i className="ri-magic-line mr-2"></i>
                        Generate Plan
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </Layout>
  );
} 