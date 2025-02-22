
export interface Symptom {
  id: string;
  name: string;
  severity: number;
}

export const commonSymptoms: Symptom[] = [
  { id: "headache", name: "Headache", severity: 0 },
  { id: "fatigue", name: "Fatigue", severity: 0 },
  { id: "fever", name: "Fever", severity: 0 },
  { id: "cough", name: "Cough", severity: 0 }
];

export const predictHealth = (symptoms: Symptom[]) => {
  // Simple prediction logic
  const totalSeverity = symptoms.reduce((sum, symptom) => sum + symptom.severity, 0);
  const avgSeverity = totalSeverity / symptoms.length;
  
  // Calculate confidence based on the number of symptoms and their severity
  const confidence = Math.min(Math.round((avgSeverity / 10) * 100), 90);

  if (avgSeverity > 7) {
    return {
      condition: "Severe Condition",
      confidence,
      dietRecommendations: [
        "Light, easily digestible foods",
        "Stay hydrated with clear fluids",
        "Avoid heavy or spicy foods",
        "Consider small, frequent meals"
      ]
    };
  } else if (avgSeverity > 4) {
    return {
      condition: "Moderate Condition",
      confidence,
      dietRecommendations: [
        "Balanced diet with extra vegetables and fruits",
        "Avoid processed foods",
        "Include lean proteins",
        "Increase fiber intake"
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
        "Whole grains"
      ]
    };
  }
};
