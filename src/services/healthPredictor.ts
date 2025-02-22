
type Symptom = {
  id: string;
  name: string;
  severity: number;
};

type HealthPrediction = {
  condition: string;
  confidence: number;
  dietRecommendations: string[];
};

const commonConditions = {
  headache: {
    condition: "Tension Headache",
    dietRecommendations: [
      "Increase water intake",
      "Eat magnesium-rich foods like leafy greens",
      "Include anti-inflammatory foods like berries",
      "Avoid processed foods and caffeine",
    ],
  },
  fatigue: {
    condition: "Possible Vitamin Deficiency",
    dietRecommendations: [
      "Increase iron-rich foods like spinach and lean meats",
      "Include vitamin B12 sources like eggs and dairy",
      "Add more whole grains to your diet",
      "Consider vitamin D rich foods like fish",
    ],
  },
  digestive: {
    condition: "Digestive Issues",
    dietRecommendations: [
      "Include probiotic-rich foods like yogurt",
      "Eat more fiber-rich vegetables",
      "Stay hydrated with water",
      "Avoid spicy and processed foods",
    ],
  },
};

export const predictHealth = (symptoms: Symptom[]): HealthPrediction => {
  // Simple prediction logic for demo
  const mainSymptom = symptoms[0];
  const prediction = commonConditions[mainSymptom.name.toLowerCase()] || {
    condition: "General Wellness Tips",
    dietRecommendations: [
      "Maintain a balanced diet",
      "Stay hydrated",
      "Eat plenty of fruits and vegetables",
      "Get adequate protein intake",
    ],
  };

  return {
    ...prediction,
    confidence: calculateConfidence(symptoms),
  };
};

const calculateConfidence = (symptoms: Symptom[]): number => {
  const severitySum = symptoms.reduce((acc, symptom) => acc + symptom.severity, 0);
  return Math.min(severitySum / (symptoms.length * 10) * 100, 90);
};

export const commonSymptoms = [
  { id: "1", name: "Headache", severity: 0 },
  { id: "2", name: "Fatigue", severity: 0 },
  { id: "3", name: "Digestive", severity: 0 },
  { id: "4", name: "Joint Pain", severity: 0 },
  { id: "5", name: "Anxiety", severity: 0 },
];
