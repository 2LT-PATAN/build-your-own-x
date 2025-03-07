import OpenAI from 'openai';
import { firestoreOperations } from '../../lib/firebaseUtils';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { userId, userDetails, dietType, goal } = req.body;
  
  if (!userId || !userDetails || !dietType || !goal) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required parameters' 
    });
  }

  const { age, weight, height, gender, activityLevel } = userDetails;

  // Calculate recommended calories based on activity level and goal
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);
  const targetCalories = adjustCaloriesForGoal(tdee, goal);

  const prompt = `Create a 7-day detailed ${dietType} meal plan for a ${gender} aged ${age} weighing ${weight}kg, height ${height}cm with activity level ${activityLevel}, aiming for ${goal}. 
  Target daily calories: ${targetCalories}.
  For each day, include breakfast, lunch, dinner, and 2 snacks.
  For each meal include:
  - Name
  - Ingredients list
  - Brief preparation instructions
  - Nutritional info (calories, protein, carbs, fats)
  Format the response as a valid JSON object with this structure:
  {
    "days": [
      {
        "dayNumber": 1,
        "meals": [
          {
            "mealType": "breakfast",
            "name": "meal name",
            "calories": number,
            "protein": number,
            "carbs": number,
            "fats": number,
            "ingredients": ["ingredient1", "ingredient2"],
            "preparation": "brief instructions",
            "vegetarian": boolean
          }
        ],
        "totalCalories": number,
        "totalProtein": number
      }
    ]
  }`;

  try {
    // Generate meal plan with OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" }
    });

    const planContent = JSON.parse(completion.choices[0].message.content);
    
    // Prepare plan data for Firestore
    const planData = {
      userId,
      userDetails,
      dietType,
      goal,
      targetCalories,
      days: planContent.days,
      name: `${dietType.charAt(0).toUpperCase() + dietType.slice(1)} Plan (${goal})`,
      generatedByAI: true,
      aiModelVersion: "gpt-3.5-turbo"
    };
    
    // Save to Firestore with our schema
    const saveResponse = await firestoreOperations.createDocument('nutrition_plans', planData);
    
    if (saveResponse.success) {
      res.status(200).json({ 
        success: true, 
        plan: { 
          id: saveResponse.id, 
          ...planData 
        } 
      });
    } else {
      throw new Error(saveResponse.errorMessage || 'Failed to save plan');
    }
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'AI generation failed' 
    });
  }
}

// Helper functions for calculating nutritional needs

function calculateBMR(weight, height, age, gender) {
  // Mifflin-St Jeor Equation
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

function calculateTDEE(bmr, activityLevel) {
  const activityMultipliers = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'active': 1.725,
    'very-active': 1.9
  };
  
  return Math.round(bmr * activityMultipliers[activityLevel]);
}

function adjustCaloriesForGoal(tdee, goal) {
  switch(goal) {
    case 'weight-loss':
      return Math.round(tdee * 0.8); // 20% deficit
    case 'weight-gain':
      return Math.round(tdee * 1.15); // 15% surplus
    case 'maintain':
    default:
      return tdee;
  }
} 