import { useEffect, useRef, useState } from 'react';
import { generateNutritionPDF } from '../utils/generatePdf';

export default function PlanDetails({ plan }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [mockData, setMockData] = useState({
    calories: {
      target: 0,
      actual: [0, 0, 0, 0, 0, 0, 0],
    },
    macros: {
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    progress: {
      weight: [0, 0, 0, 0, 0, 0, 0],
    },
  });

  const caloriesChartRef = useRef(null);
  const macrosChartRef = useRef(null);
  const progressChartRef = useRef(null);
  
  const chartsReady = useRef(false);

  // Process plan data for charts
  useEffect(() => {
    if (!plan) return;

    // Calculate target calories and actual calories per day
    const targetCalories = plan.days.reduce((sum, day) => sum + day.totalCalories, 0) / plan.days.length;
    const actualCalories = plan.days.map(day => day.totalCalories);

    // Calculate average macros across all days
    const totalProtein = plan.days.reduce((sum, day) => sum + day.meals.reduce((mealSum, meal) => mealSum + meal.protein, 0), 0);
    const totalCarbs = plan.days.reduce((sum, day) => sum + day.meals.reduce((mealSum, meal) => mealSum + meal.carbs, 0), 0);
    const totalFat = plan.days.reduce((sum, day) => sum + day.meals.reduce((mealSum, meal) => mealSum + meal.fats, 0), 0);
    const totalCalories = plan.days.reduce((sum, day) => sum + day.totalCalories, 0);

    // Calculate macros as percentages
    const proteinCalories = totalProtein * 4;
    const carbsCalories = totalCarbs * 4;
    const fatCalories = totalFat * 9;
    
    const proteinPercentage = Math.round((proteinCalories / totalCalories) * 100);
    const carbsPercentage = Math.round((carbsCalories / totalCalories) * 100);
    const fatPercentage = Math.round((fatCalories / totalCalories) * 100);

    // Mock weight data - in a real app, this would come from the user's profile
    const startWeight = plan.userDetails.weight;
    const weightGoalDelta = plan.goal === 'weight-loss' ? -0.3 : (plan.goal === 'weight-gain' ? 0.3 : 0);
    const weightProgress = Array(7).fill(0).map((_, i) => +(startWeight + weightGoalDelta * i).toFixed(1));

    setMockData({
      calories: {
        target: Math.round(targetCalories),
        actual: actualCalories,
      },
      macros: {
        protein: proteinPercentage,
        carbs: carbsPercentage,
        fat: fatPercentage,
      },
      progress: {
        weight: weightProgress,
      },
    });
  }, [plan]);

  // Initialize and update charts when data changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.echarts) return;
    
    const initializeCharts = () => {
      if (!caloriesChartRef.current || !macrosChartRef.current || !progressChartRef.current) return;
      
      const caloriesChart = window.echarts.init(caloriesChartRef.current);
      const macrosChart = window.echarts.init(macrosChartRef.current);
      const progressChart = window.echarts.init(progressChartRef.current);
      
      caloriesChart.setOption({
        animation: false,
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(31, 41, 55, 0.9)",
          borderColor: "#4B5563",
          textStyle: { color: "#F3F4F6" },
        },
        xAxis: {
          type: "category",
          data: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
          axisLine: { lineStyle: { color: "#4B5563" } },
        },
        yAxis: {
          type: "value",
          axisLine: { lineStyle: { color: "#4B5563" } },
        },
        series: [
          {
            data: mockData.calories.actual,
            type: "line",
            smooth: true,
            lineStyle: { color: "rgba(87, 181, 231, 1)" },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(87, 181, 231, 0.2)",
                  },
                  {
                    offset: 1,
                    color: "rgba(87, 181, 231, 0)",
                  },
                ],
              },
            },
            symbol: "none",
          },
        ],
        grid: { top: 20, right: 20, bottom: 20, left: 40 },
      });
      
      macrosChart.setOption({
        animation: false,
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(31, 41, 55, 0.9)",
          borderColor: "#4B5563",
          textStyle: { color: "#F3F4F6" },
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            data: [
              { value: mockData.macros.protein, name: "Protein" },
              { value: mockData.macros.carbs, name: "Carbs" },
              { value: mockData.macros.fat, name: "Fat" },
            ],
            label: { 
              show: true,
              formatter: '{b}: {c}%' 
            },
            color: [
              "rgba(87, 181, 231, 1)",
              "rgba(141, 211, 199, 1)",
              "rgba(251, 191, 114, 1)",
            ],
          },
        ],
        grid: { top: 20, right: 20, bottom: 20, left: 40 },
      });
      
      progressChart.setOption({
        animation: false,
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(31, 41, 55, 0.9)",
          borderColor: "#4B5563",
          textStyle: { color: "#F3F4F6" },
        },
        xAxis: {
          type: "category",
          data: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
          axisLine: { lineStyle: { color: "#4B5563" } },
        },
        yAxis: {
          type: "value",
          axisLine: { lineStyle: { color: "#4B5563" } },
        },
        series: [
          {
            data: mockData.progress.weight,
            type: "line",
            smooth: true,
            lineStyle: { color: "rgba(252, 141, 98, 1)" },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(252, 141, 98, 0.2)",
                  },
                  {
                    offset: 1,
                    color: "rgba(252, 141, 98, 0)",
                  },
                ],
              },
            },
            symbol: "none",
          },
        ],
        grid: { top: 20, right: 20, bottom: 20, left: 40 },
      });
      
      chartsReady.current = true;
      
      const handleResize = () => {
        caloriesChart.resize();
        macrosChart.resize();
        progressChart.resize();
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    };
    
    const timer = setTimeout(initializeCharts, 500);
    return () => clearTimeout(timer);
  }, [mockData]);

  if (!plan) return null;

  const currentDay = plan.days[selectedDay];
  const getMealTypeTime = (type) => {
    const times = {
      'breakfast': '8:00 AM',
      'lunch': '12:30 PM',
      'dinner': '7:00 PM',
      'snack': '3:30 PM'
    };
    return times[type] || '';
  };

  const handleDownloadPDF = async () => {
    try {
      await generateNutritionPDF(plan, plan.userDetails);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again later.');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-100">Your 7-Day Meal Plan</h1>
          <button 
            onClick={handleDownloadPDF}
            className="bg-secondary text-white py-2 px-4 rounded-button hover:bg-secondary/90 transition flex items-center"
          >
            <i className="ri-download-line mr-2"></i> Download PDF
          </button>
        </div>
        <p className="mt-2 text-gray-400">
          Personalized nutrition plan based on your profile and preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Daily Calories</h3>
            <span className="text-2xl font-bold text-primary">{mockData.calories.target}</span>
          </div>
          <div ref={caloriesChartRef} className="h-48"></div>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Macronutrients</h3>
          </div>
          <div ref={macrosChartRef} className="h-48"></div>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Weight Projection</h3>
          </div>
          <div ref={progressChartRef} className="h-48"></div>
        </div>
      </div>
      
      <div className="mb-8 overflow-x-auto">
        <div className="flex items-center space-x-4 pb-2">
          {plan.days.map((day, idx) => (
            <button 
              key={idx}
              onClick={() => setSelectedDay(idx)}
              className={`px-4 py-2 rounded-button whitespace-nowrap ${
                selectedDay === idx 
                  ? 'bg-primary text-white' 
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              Day {day.dayNumber}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentDay.meals.map((meal, idx) => (
          <div key={idx} className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold capitalize">{meal.mealType}</h3>
                <span className="text-sm text-gray-500">{getMealTypeTime(meal.mealType)}</span>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">{meal.name}</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-700 rounded-full text-sm">
                    Calories: {meal.calories}
                  </span>
                  <span className="px-2 py-1 bg-gray-700 rounded-full text-sm">
                    Protein: {meal.protein}g
                  </span>
                  <span className="px-2 py-1 bg-gray-700 rounded-full text-sm">
                    Carbs: {meal.carbs}g
                  </span>
                  <span className="px-2 py-1 bg-gray-700 rounded-full text-sm">
                    Fat: {meal.fats}g
                  </span>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-300 mb-2">Ingredients:</h5>
                  <ul className="list-disc list-inside text-gray-400">
                    {meal.ingredients.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-300 mb-2">Preparation:</h5>
                  <p className="text-gray-400 text-sm">{meal.preparation}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 