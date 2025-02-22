
export interface Symptom {
  id: string;
  name: string;
  severity: number;
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
}

export const commonSymptoms: Symptom[] = [
  { id: "headache", name: "Headache", severity: 0 },
  { id: "fatigue", name: "Fatigue", severity: 0 },
  { id: "fever", name: "Fever", severity: 0 },
  { id: "cough", name: "Cough", severity: 0 }
];

export const predictHealth = (healthData: HealthData) => {
  const { symptoms, age, weight, sleepHours, eatingHabits } = healthData;
  
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
  
  // Calculate confidence
  const confidence = Math.min(Math.round((adjustedSeverity / 10) * 100), 90);

  // Define recommendations based on all factors
  if (adjustedSeverity > 7) {
    return {
      condition: "Severe Condition",
      confidence,
      dietRecommendations: [
        "Light, easily digestible foods",
        "Stay hydrated with clear fluids",
        "Avoid heavy or spicy foods",
        `Eat ${eatingHabits.mealsPerDay < 3 ? "more" : "smaller"} frequent meals`,
        `Consider adjusting sleep schedule (current: ${sleepHours} hours)`
      ]
    };
  } else if (adjustedSeverity > 4) {
    return {
      condition: "Moderate Condition",
      confidence,
      dietRecommendations: [
        "Balanced diet with extra vegetables and fruits",
        "Avoid processed foods",
        "Include lean proteins",
        "Increase fiber intake",
        `Aim for ${eatingHabits.regularMealTimes ? "maintaining" : "establishing"} regular meal times`
      ]
    };
  } else {
    return {
      condition: "Mild Condition",
      confidence,
      dietRecommendations: [
        "Regular healthy diet",
        "Plenty of fluids",
        "Fresh fruits and vegetables",
        "Whole grains",
        `Maintain ${sleepHours >= 7 && sleepHours <= 9 ? "current" : "better"} sleep schedule`
      ]
    };
  }
};
