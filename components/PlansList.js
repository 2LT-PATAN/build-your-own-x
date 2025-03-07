import Link from 'next/link';
import { generateNutritionPDF } from '../utils/generatePdf';

export default function PlansList({ plans }) {
  if (!plans || plans.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 text-center">
        <h3 className="text-xl font-semibold mb-4">No Nutrition Plans Yet</h3>
        <p className="text-gray-400 mb-6">Create your first personalized nutrition plan to get started.</p>
        <Link href="/create-plan" className="bg-primary text-white py-2 px-6 rounded-button hover:bg-primary/90 inline-block">
          Create a Plan
        </Link>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatGoal = (goal) => {
    const goals = {
      'weight-loss': 'Weight Loss',
      'weight-gain': 'Weight Gain',
      'maintain': 'Maintenance'
    };
    return goals[goal] || goal;
  };

  const formatDietType = (dietType) => {
    const types = {
      'veg': 'Vegetarian',
      'non-veg': 'Non-Vegetarian',
      'both': 'Mixed',
      'vegan': 'Vegan',
      'keto': 'Ketogenic',
      'paleo': 'Paleo'
    };
    return types[dietType] || dietType;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div key={plan.id} className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">{formatDate(plan.createdAt)}</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                {formatGoal(plan.goal)}
              </span>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-400">
                <span className="text-gray-300">Diet:</span> {formatDietType(plan.dietType)}
              </p>
              <p className="text-gray-400">
                <span className="text-gray-300">Calories:</span> ~{Math.round(plan.days.reduce((sum, day) => sum + day.totalCalories, 0) / plan.days.length)} / day
              </p>
              <p className="text-gray-400">
                <span className="text-gray-300">Stats:</span> {plan.userDetails.age} years, {plan.userDetails.weight}kg, {plan.userDetails.height}cm
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Sample Meals:</h4>
              <ul className="list-disc list-inside text-gray-400 text-sm mb-4">
                {plan.days[0]?.meals.slice(0, 3).map((meal, idx) => (
                  <li key={idx}>
                    <span className="capitalize">{meal.mealType}:</span> {meal.name}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex space-x-3 mt-4">
              <Link
                href={`/plan/${plan.id}`}
                className="flex-1 bg-primary text-white py-1.5 px-3 rounded-button hover:bg-primary/90 text-center transition"
              >
                View Details
              </Link>
              <button
                onClick={() => generateNutritionPDF(plan, plan.userDetails)}
                className="bg-secondary text-white p-1.5 rounded-button hover:bg-secondary/90 transition"
                title="Download PDF"
              >
                <i className="ri-download-line"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <Link href="/create-plan" className="flex flex-col items-center justify-center bg-gray-800 rounded-lg shadow-lg border border-gray-700 border-dashed p-6 h-full min-h-60">
        <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
          <i className="ri-add-line text-3xl text-primary"></i>
        </div>
        <h3 className="text-lg font-medium text-primary">Create New Plan</h3>
        <p className="text-gray-400 text-center mt-2">Generate a nutrition plan based on your goals and preferences</p>
      </Link>
    </div>
  );
} 