import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';

// Mock data for demonstration
const mockWorkoutPlan = {
  id: 'workout-123',
  createdAt: new Date().toISOString(),
  userDetails: {
    age: 28,
    weight: 75,
    height: 175,
    gender: 'male',
    fitnessLevel: 'intermediate'
  },
  goal: 'strength',
  equipment: 'full-gym',
  workoutDays: 4,
  timePerSession: 60,
  days: [
    {
      day: 1,
      focus: 'Chest and Triceps',
      exercises: [
        {
          name: 'Barbell Bench Press',
          sets: 4,
          reps: '8-10',
          rest: '90 sec',
          instructions: 'Keep your feet flat on the floor and maintain a natural arch in your lower back.'
        },
        {
          name: 'Incline Dumbbell Press',
          sets: 3,
          reps: '10-12',
          rest: '60 sec',
          instructions: 'Set bench to 30-45 degree angle. Press dumbbells straight up over chest.'
        },
        {
          name: 'Cable Flyes',
          sets: 3,
          reps: '12-15',
          rest: '60 sec',
          instructions: 'Maintain slight bend in elbows throughout movement. Focus on chest contraction.'
        },
        {
          name: 'Tricep Dips',
          sets: 3,
          reps: '10-12',
          rest: '60 sec',
          instructions: 'Lower until upper arms are parallel to floor. Keep elbows close to body.'
        },
        {
          name: 'Tricep Pushdowns',
          sets: 3,
          reps: '12-15',
          rest: '60 sec',
          instructions: 'Keep elbows at sides throughout movement. Fully extend arms.'
        }
      ],
      warmup: 'Light cardio for 5 minutes, followed by dynamic stretching.',
      cooldown: 'Static stretching of trained muscle groups for 5 minutes.'
    },
    {
      day: 2,
      focus: 'Back and Biceps',
      exercises: [
        {
          name: 'Pull-ups',
          sets: 4,
          reps: '6-8',
          rest: '90 sec',
          instructions: 'Pull until chin clears bar. Full extension at bottom.'
        },
        {
          name: 'Bent-over Barbell Rows',
          sets: 4,
          reps: '8-10',
          rest: '90 sec',
          instructions: 'Maintain flat back. Pull bar to lower chest/upper abdomen.'
        },
        {
          name: 'Seated Cable Rows',
          sets: 3,
          reps: '10-12',
          rest: '60 sec',
          instructions: 'Keep chest up and pull handles to torso. Squeeze shoulder blades together.'
        },
        {
          name: 'Barbell Curls',
          sets: 3,
          reps: '10-12',
          rest: '60 sec',
          instructions: 'Keep elbows at sides. Full range of motion.'
        },
        {
          name: 'Hammer Curls',
          sets: 3,
          reps: '12-15',
          rest: '60 sec',
          instructions: 'Neutral grip (palms facing each other). Minimize swinging.'
        }
      ],
      warmup: 'Light cardio for 5 minutes, followed by dynamic stretching.',
      cooldown: 'Static stretching of trained muscle groups for 5 minutes.'
    },
    {
      day: 3,
      focus: 'Rest Day',
      exercises: [
        {
          name: 'Light Walking',
          sets: 1,
          reps: '20-30 minutes',
          rest: 'N/A',
          instructions: 'Keep intensity low. Focus on recovery.'
        },
        {
          name: 'Foam Rolling',
          sets: 1,
          reps: '5-10 minutes',
          rest: 'N/A',
          instructions: 'Focus on tight areas. Roll each muscle group for 30-60 seconds.'
        }
      ],
      warmup: 'N/A',
      cooldown: 'Full body stretching session, 10-15 minutes.'
    },
    {
      day: 4,
      focus: 'Legs and Shoulders',
      exercises: [
        {
          name: 'Barbell Squats',
          sets: 4,
          reps: '8-10',
          rest: '120 sec',
          instructions: 'Keep chest up, back straight. Descend until thighs are parallel to floor.'
        },
        {
          name: 'Romanian Deadlifts',
          sets: 3,
          reps: '10-12',
          rest: '90 sec',
          instructions: 'Maintain slight bend in knees. Hinge at hips, keep back flat.'
        },
        {
          name: 'Leg Press',
          sets: 3,
          reps: '12-15',
          rest: '90 sec',
          instructions: 'Don\'t lock knees at top. Control the descent.'
        },
        {
          name: 'Overhead Press',
          sets: 4,
          reps: '8-10',
          rest: '90 sec',
          instructions: 'Press bar directly overhead. Keep core tight.'
        },
        {
          name: 'Lateral Raises',
          sets: 3,
          reps: '12-15',
          rest: '60 sec',
          instructions: 'Slight bend in elbows. Raise to shoulder height.'
        }
      ],
      warmup: 'Light cardio for 5 minutes, followed by dynamic stretching.',
      cooldown: 'Static stretching of trained muscle groups for 5 minutes.'
    }
  ],
  notes: 'Increase weight when you can complete all sets at the higher rep range with good form. Stay hydrated during workouts. Focus on proper form rather than lifting heavier weights with poor form.',
  expectedResults: 'Following this plan consistently should lead to noticeable strength gains within 4-6 weeks. Combine with proper nutrition for optimal results.'
};

export default function WorkoutPlanDetails() {
  const router = useRouter();
  const { isNew } = router.query;
  const { user, loading } = useAuth();
  const [activeDay, setActiveDay] = useState(0);
  const [plan, setPlan] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(true);

  useEffect(() => {
    // This would be replaced with actual API call to fetch plan
    // For now, using mock data
    const fetchPlan = async () => {
      setLoadingPlan(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setPlan(mockWorkoutPlan);
      } catch (error) {
        console.error('Error fetching workout plan:', error);
      } finally {
        setLoadingPlan(false);
      }
    };

    if (user) {
      fetchPlan();
    }
  }, [user]);

  // Function to download the workout plan as PDF
  const handleDownloadPDF = () => {
    // This would be implemented similar to the nutrition PDF generator
    console.log('Downloading workout plan as PDF...');
    alert('PDF download functionality would be implemented here');
  };

  if (loading || loadingPlan) {
    return (
      <Layout title="Workout Plan">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout title="Workout Plan">
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 text-center">
          <div className="mx-auto w-16 h-16 mb-4 bg-gray-700 rounded-full flex items-center justify-center">
            <i className="ri-lock-line text-3xl text-primary"></i>
          </div>
          <h3 className="text-xl font-semibold mb-4">Authentication Required</h3>
          <p className="mb-6 text-gray-400">Please sign in to view your workout plan</p>
          <Link href="/" className="bg-primary text-white py-2 px-6 rounded-button hover:bg-primary/90 inline-block">
            Go to Login
          </Link>
        </div>
      </Layout>
    );
  }

  if (!plan) {
    return (
      <Layout title="Workout Plan">
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 text-center">
          <div className="mx-auto w-16 h-16 mb-4 bg-gray-700 rounded-full flex items-center justify-center">
            <i className="ri-error-warning-line text-3xl text-red-500"></i>
          </div>
          <h3 className="text-xl font-semibold mb-4">Plan Not Found</h3>
          <p className="mb-6 text-gray-400">The workout plan you're looking for could not be found</p>
          <Link href="/gym/workout-plans" className="bg-primary text-white py-2 px-6 rounded-button hover:bg-primary/90 inline-block">
            Create New Plan
          </Link>
        </div>
      </Layout>
    );
  }

  const currentDay = plan.days[activeDay];
  const getGoalIcon = (goal) => {
    const icons = {
      'strength': 'ri-muscle-line',
      'weight-loss': 'ri-scales-line',
      'endurance': 'ri-run-line',
      'flexibility': 'ri-yoga-line',
      'muscle-gain': 'ri-body-scan-line',
      'maintenance': 'ri-heart-pulse-line'
    };
    return icons[goal] || 'ri-fitness-line';
  };

  const formatGoal = (goal) => {
    const goals = {
      'strength': 'Strength Building',
      'weight-loss': 'Weight Loss',
      'endurance': 'Endurance',
      'flexibility': 'Flexibility',
      'muscle-gain': 'Muscle Gain',
      'maintenance': 'Maintenance'
    };
    return goals[goal] || goal;
  };

  return (
    <Layout title={`Workout Plan - ${formatGoal(plan.goal)}`}>
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link href="/gym/workout-plans" className="mr-2 text-gray-400 hover:text-white">
            <i className="ri-arrow-left-line"></i> Back to Workout Plans
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-100">Your Workout Plan</h1>
          <button 
            onClick={handleDownloadPDF}
            className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-button font-medium transition flex items-center"
          >
            <i className="ri-download-line mr-2"></i> Download PDF
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 rounded-full bg-${plan.goal === 'weight-loss' ? 'red' : 'blue'}-500/20 flex items-center justify-center mr-3`}>
              <i className={`${getGoalIcon(plan.goal)} text-2xl text-${plan.goal === 'weight-loss' ? 'red' : 'blue'}-500`}></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{formatGoal(plan.goal)}</h3>
              <p className="text-gray-400">{plan.workoutDays} days per week</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Workout Days:</span>
              <span className="text-white font-medium">{plan.workoutDays} days/week</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Duration:</span>
              <span className="text-white font-medium">{plan.timePerSession} minutes/session</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Level:</span>
              <span className="text-white font-medium capitalize">{plan.userDetails.fitnessLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Equipment:</span>
              <span className="text-white font-medium capitalize">{plan.equipment.replace('-', ' ')}</span>
            </div>
          </div>
        </div>
        
        <div className="col-span-2 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Expected Results</h3>
          <p className="text-gray-300 mb-4">{plan.expectedResults}</p>
          <h4 className="font-medium text-white mt-4 mb-2">Important Notes:</h4>
          <p className="text-gray-300">{plan.notes}</p>
        </div>
      </div>
      
      <div className="mb-8 overflow-x-auto">
        <div className="flex items-center space-x-4 pb-2">
          {plan.days.map((day, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveDay(idx)}
              className={`px-4 py-2 rounded-button whitespace-nowrap ${
                activeDay === idx 
                  ? 'bg-primary text-white' 
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              {day.focus !== 'Rest Day' 
                ? `Day ${day.day}: ${day.focus}` 
                : `Day ${day.day}: Rest`
              }
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            Day {currentDay.day}: {currentDay.focus}
          </h3>
          {currentDay.focus !== 'Rest Day' && (
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {currentDay.exercises.length} Exercises
            </span>
          )}
        </div>
        
        {currentDay.warmup && currentDay.warmup !== 'N/A' && (
          <div className="mb-6">
            <h4 className="text-lg font-medium text-white mb-2">Warm-up</h4>
            <p className="text-gray-300">{currentDay.warmup}</p>
          </div>
        )}
        
        <div className="mb-6">
          <h4 className="text-lg font-medium text-white mb-4">Exercises</h4>
          <div className="space-y-4">
            {currentDay.exercises.map((exercise, idx) => (
              <div key={idx} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h5 className="text-white font-medium">{exercise.name}</h5>
                  <div className="flex flex-wrap gap-2">
                    {exercise.sets > 0 && (
                      <span className="px-2 py-1 bg-gray-600 rounded-full text-xs text-gray-200">
                        {exercise.sets} sets
                      </span>
                    )}
                    <span className="px-2 py-1 bg-gray-600 rounded-full text-xs text-gray-200">
                      {exercise.reps}
                    </span>
                    {exercise.rest !== 'N/A' && (
                      <span className="px-2 py-1 bg-gray-600 rounded-full text-xs text-gray-200">
                        Rest: {exercise.rest}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{exercise.instructions}</p>
              </div>
            ))}
          </div>
        </div>
        
        {currentDay.cooldown && currentDay.cooldown !== 'N/A' && (
          <div>
            <h4 className="text-lg font-medium text-white mb-2">Cool-down</h4>
            <p className="text-gray-300">{currentDay.cooldown}</p>
          </div>
        )}
      </div>
      
      {isNew && (
        <div className="bg-primary/10 border border-primary rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <i className="ri-information-line text-xl text-primary"></i>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-primary">Your New Workout Plan is Ready!</h3>
              <div className="mt-2 text-gray-300">
                <p>This personalized workout plan has been created based on your fitness goals and preferences. Follow this plan consistently for the best results.</p>
                <p className="mt-2">Combine this workout plan with your nutrition plan for optimal results.</p>
                <div className="mt-4">
                  <Link 
                    href="/create-plan" 
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                  >
                    Create a Nutrition Plan <i className="ri-arrow-right-line ml-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
} 