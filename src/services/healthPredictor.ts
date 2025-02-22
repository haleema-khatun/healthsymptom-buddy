
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

  if (avgSeverity > 7) {
    return {
      condition: "Severe Condition",
      recommendation: "Please seek immediate medical attention.",
      dietRecommendation: "Light, easily digestible foods. Stay hydrated."
    };
  } else if (avgSeverity > 4) {
    return {
      condition: "Moderate Condition",
      recommendation: "Rest and monitor symptoms. Consult a doctor if symptoms persist.",
      dietRecommendation: "Balanced diet with extra vegetables and fruits. Avoid processed foods."
    };
  } else {
    return {
      condition: "Mild Condition",
      recommendation: "Rest and self-care should help resolve symptoms.",
      dietRecommendation: "Regular healthy diet with plenty of fluids."
    };
  }
};
