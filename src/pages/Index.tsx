
import { useState } from "react";
import { SymptomInput } from "@/components/SymptomInput";
import { HealthPrediction } from "@/components/HealthPrediction";
import { FoodTracker } from "@/components/FoodTracker";
import { commonSymptoms, predictHealth, type HealthData } from "@/services/healthPredictor";
import { motion } from "framer-motion";

const Index = () => {
  const [prediction, setPrediction] = useState(null);
  const [activeTab, setActiveTab] = useState<'symptoms' | 'food'>('symptoms');

  const handleHealthDataSubmit = (healthData: HealthData) => {
    const result = predictHealth(healthData);
    setPrediction(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-white">
      <div className="container px-4 py-12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Health Symptom Analyzer</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track your symptoms, eating habits, and get personalized health insights and dietary recommendations
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
            <button
              onClick={() => setActiveTab('symptoms')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'symptoms'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Symptoms
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'food'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Food Tracker
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-8">
          {activeTab === 'symptoms' ? (
            <>
              <SymptomInput symptoms={commonSymptoms} onSubmit={handleHealthDataSubmit} />
              {prediction && <HealthPrediction prediction={prediction} />}
            </>
          ) : (
            <FoodTracker />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
