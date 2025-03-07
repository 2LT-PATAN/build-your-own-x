// We need to conditionally import pdfMake since it's a client-only library
let pdfMake = null;
let pdfFonts = null;

// Helper function to dynamically import pdfmake when needed (client-side only)
const loadPdfMake = async () => {
  if (typeof window === 'undefined') return null;
  
  if (!pdfMake) {
    // Dynamic imports for client-side only
    pdfMake = (await import('pdfmake/build/pdfmake')).default;
    pdfFonts = (await import('pdfmake/build/vfs_fonts')).default;
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }
  
  return pdfMake;
};

export const generateNutritionPDF = async (plan, userDetails) => {
  // Ensure pdfMake is loaded (client-side only)
  const pdfMake = await loadPdfMake();
  
  // If we're on the server, or if pdfMake failed to load, exit early
  if (!pdfMake) {
    console.error('PDF generation is only available in browser environment');
    return;
  }

  // Configure the document definition
  const content = [
    { text: 'Personalized Nutrition Plan', style: 'header' },
    { text: `Age: ${userDetails.age} | Weight: ${userDetails.weight}kg | Height: ${userDetails.height}cm`, style: 'subheader' },
    { text: `Goal: ${formatGoal(plan.goal)} | Diet Type: ${formatDietType(plan.dietType)}`, style: 'subheader' },
    { text: `Activity Level: ${formatActivityLevel(userDetails.activityLevel)}`, style: 'subheader' },
    { text: '\n' },
  ];

  // Add each day's meal plan
  plan.days.forEach(day => {
    content.push({ text: `Day ${day.dayNumber}`, style: 'dayHeader' });
    
    // Add daily nutrition summary
    content.push({
      text: `Daily Totals: ${day.totalCalories} calories | ${day.totalProtein}g protein`,
      style: 'summary',
      margin: [0, 0, 0, 10]
    });
    
    // Add each meal
    day.meals.forEach(meal => {
      content.push({
        text: `${formatMealType(meal.mealType)}: ${meal.name}`,
        style: 'mealHeader'
      });
      
      content.push({
        columns: [
          {
            width: '50%',
            stack: [
              { text: 'Nutrition Information:', style: 'label' },
              { text: `Calories: ${meal.calories}`, style: 'nutritionInfo' },
              { text: `Protein: ${meal.protein}g`, style: 'nutritionInfo' },
              { text: `Carbs: ${meal.carbs}g`, style: 'nutritionInfo' },
              { text: `Fats: ${meal.fats}g`, style: 'nutritionInfo' },
            ]
          },
          {
            width: '50%',
            stack: [
              { text: 'Ingredients:', style: 'label' },
              { 
                ul: meal.ingredients.map(ingredient => ({
                  text: ingredient,
                  style: 'ingredient'
                }))
              }
            ]
          }
        ],
        margin: [0, 5, 0, 10]
      });
      
      content.push({ 
        text: 'Preparation:', 
        style: 'label' 
      });
      
      content.push({ 
        text: meal.preparation,
        style: 'preparation',
        margin: [0, 0, 0, 15]
      });
    });
    
    content.push({ text: '\n' });
  });

  const docDefinition = {
    content,
    styles: {
      header: { fontSize: 24, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
      subheader: { fontSize: 14, alignment: 'center', margin: [0, 5, 0, 0] },
      dayHeader: { fontSize: 18, bold: true, margin: [0, 10, 0, 5], decoration: 'underline' },
      summary: { fontSize: 12, italics: true },
      mealHeader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
      label: { fontSize: 12, bold: true, margin: [0, 5, 0, 3] },
      nutritionInfo: { fontSize: 10, margin: [10, 0, 0, 0] },
      ingredient: { fontSize: 10 },
      preparation: { fontSize: 10, margin: [10, 2, 0, 0] }
    }
  };

  pdfMake.createPdf(docDefinition).download(`nutrition-plan-${formatDate(new Date())}.pdf`);
};

// Helper functions for formatting
function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function formatGoal(goal) {
  const goals = {
    'weight-loss': 'Weight Loss',
    'weight-gain': 'Weight Gain',
    'maintain': 'Maintenance'
  };
  return goals[goal] || goal;
}

function formatDietType(dietType) {
  const types = {
    'veg': 'Vegetarian',
    'non-veg': 'Non-Vegetarian',
    'both': 'Mixed',
    'vegan': 'Vegan',
    'keto': 'Ketogenic',
    'paleo': 'Paleo'
  };
  return types[dietType] || dietType;
}

function formatActivityLevel(level) {
  const levels = {
    'sedentary': 'Sedentary (little or no exercise)',
    'light': 'Light (exercise 1-3 days/week)',
    'moderate': 'Moderate (exercise 3-5 days/week)',
    'active': 'Active (exercise 6-7 days/week)',
    'very-active': 'Very Active (intense exercise daily)'
  };
  return levels[level] || level;
}

function formatMealType(type) {
  const types = {
    'breakfast': 'Breakfast',
    'lunch': 'Lunch',
    'dinner': 'Dinner',
    'snack': 'Snack'
  };
  return types[type] || type;
} 