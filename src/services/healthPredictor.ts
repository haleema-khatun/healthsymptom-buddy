
export interface Symptom {
  id: string;
  name: string;
  severity: number;
}

export interface MealInfo {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  snacks: number;
  balancedMeals: boolean;
}

export interface HealthData {
  symptoms: Symptom[];
  age: number;
  weight: number;
  sleepHours: number;
  eatingHabits: {
    mealsPerDay: number;
    regularMealTimes: boolean;
    healthyDiet: boolean;
  };
  meals: MealInfo;
}

export const commonSymptoms: Symptom[] = [
  { id: "headache", name: "Headache", severity: 0 },
  { id: "fatigue", name: "Fatigue", severity: 0 },
  { id: "fever", name: "Fever", severity: 0 },
  { id: "cough", name: "Cough", severity: 0 }
];

export const predictHealth = (healthData: HealthData) => {
  const { symptoms, age, weight, sleepHours, eatingHabits, meals } = healthData;
  
  // Calculate base severity from symptoms
  const totalSeverity = symptoms.reduce((sum, symptom) => sum + symptom.severity, 0);
  const avgSeverity = totalSeverity / symptoms.length;
  
  // Adjust severity based on lifestyle factors
  let adjustedSeverity = avgSeverity;
  
  // Sleep impact (optimal sleep is 7-9 hours)
  if (sleepHours < 6 || sleepHours > 10) {
    adjustedSeverity += 1;
  }
  
  // Eating habits impact
  if (!eatingHabits.regularMealTimes) adjustedSeverity += 0.5;
  if (!eatingHabits.healthyDiet) adjustedSeverity += 0.5;
  if (eatingHabits.mealsPerDay < 2 || eatingHabits.mealsPerDay > 5) adjustedSeverity += 0.5;

  // Meal pattern impact
  if (!meals.breakfast) adjustedSeverity += 0.5;
  if (!meals.balancedMeals) adjustedSeverity += 0.5;
  if (meals.snacks > 3) adjustedSeverity += 0.3;
  
  // Calculate confidence
  const confidence = Math.min(Math.round((adjustedSeverity / 10) * 100), 90);

  // Define recommendations based on all factors
  const baseDietRecommendations = [];
  
  // Add meal-specific recommendations
  if (!meals.breakfast) {
    baseDietRecommendations.push("Start your day with a nutritious breakfast");
  }
  if (meals.snacks > 3) {
    baseDietRecommendations.push("Reduce snacking frequency, focus on balanced main meals");
  }
  if (!meals.balancedMeals) {
    baseDietRecommendations.push("Include proteins, vegetables, and whole grains in your main meals");
  }

  if (adjustedSeverity > 7) {
    return {
      condition: "Severe Condition",
      confidence,
      dietRecommendations: [
        ...baseDietRecommendations,
        "Light, easily digestible foods",
        "Stay hydrated with clear fluids",
        "Avoid heavy or spicy foods",
      ]
    };
  } else if (adjustedSeverity > 4) {
    return {
      condition: "Moderate Condition",
      confidence,
      dietRecommendations: [
        ...baseDietRecommendations,
        "Balanced diet with extra vegetables and fruits",
        "Avoid processed foods",
        "Include lean proteins"
      ]
    };
  } else {
    return {
      condition: "Mild Condition",
      confidence,
      dietRecommendations: [
        ...baseDietRecommendations,
        "Regular healthy diet",
        "Plenty of fluids",
        "Fresh fruits and vegetables"
      ]
    };
  }
};
