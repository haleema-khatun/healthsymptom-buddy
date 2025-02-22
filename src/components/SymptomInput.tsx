
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { Symptom } from "@/services/healthPredictor";

interface SymptomInputProps {
  symptoms: Symptom[];
  onSubmit: (symptoms: Symptom[]) => void;
}

export const SymptomInput = ({ symptoms: initialSymptoms, onSubmit }: SymptomInputProps) => {
  const [symptoms, setSymptoms] = useState<Symptom[]>(initialSymptoms);

  const handleSeverityChange = (id: string, severity: number[]) => {
    setSymptoms(prev =>
      prev.map(symptom =>
        symptom.id === id ? { ...symptom, severity: severity[0] } : symptom
      )
    );
  };

  return (
    <Card className="w-full max-w-lg p-6 space-y-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rate Your Symptoms</h2>
      <div className="space-y-6">
        {symptoms.map((symptom, index) => (
          <motion.div
            key={symptom.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">{symptom.name}</label>
              <span className="text-sm text-gray-500">{symptom.severity}/10</span>
            </div>
            <Slider
              value={[symptom.severity]}
              max={10}
              step={1}
              onValueChange={(value) => handleSeverityChange(symptom.id, value)}
              className="cursor-pointer"
            />
          </motion.div>
        ))}
      </div>
      <Button
        onClick={() => onSubmit(symptoms)}
        className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300"
      >
        Analyze Symptoms
      </Button>
    </Card>
  );
};
