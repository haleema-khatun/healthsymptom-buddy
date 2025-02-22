
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import type { Symptom, HealthData } from "@/services/healthPredictor";

interface SymptomInputProps {
  symptoms: Symptom[];
  onSubmit: (healthData: HealthData) => void;
}

export const SymptomInput = ({ symptoms: initialSymptoms, onSubmit }: SymptomInputProps) => {
  const [symptoms, setSymptoms] = useState<Symptom[]>(initialSymptoms);
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(70);
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [eatingHabits, setEatingHabits] = useState({
    mealsPerDay: 3,
    regularMealTimes: true,
    healthyDiet: true,
  });

  const handleSeverityChange = (id: string, severity: number[]) => {
    setSymptoms(prev =>
      prev.map(symptom =>
        symptom.id === id ? { ...symptom, severity: severity[0] } : symptom
      )
    );
  };

  const handleSubmit = () => {
    onSubmit({
      symptoms,
      age,
      weight,
      sleepHours,
      eatingHabits,
    });
  };

  return (
    <Card className="w-full max-w-lg p-6 space-y-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Health Assessment</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Age</label>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              min={0}
              max={120}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Weight (kg)</label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              min={0}
              max={300}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Sleep Hours</label>
          <Slider
            value={[sleepHours]}
            max={12}
            step={0.5}
            onValueChange={(value) => setSleepHours(value[0])}
          />
          <div className="text-sm text-gray-500 text-right">{sleepHours} hours</div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Eating Habits</h3>
          <div className="space-y-2">
            <label className="text-sm text-gray-700">Meals per Day</label>
            <Slider
              value={[eatingHabits.mealsPerDay]}
              max={6}
              step={1}
              onValueChange={(value) => setEatingHabits(prev => ({ ...prev, mealsPerDay: value[0] }))}
            />
            <div className="text-sm text-gray-500 text-right">{eatingHabits.mealsPerDay} meals</div>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700">Regular Meal Times</label>
            <Switch
              checked={eatingHabits.regularMealTimes}
              onCheckedChange={(checked) => 
                setEatingHabits(prev => ({ ...prev, regularMealTimes: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700">Healthy Diet</label>
            <Switch
              checked={eatingHabits.healthyDiet}
              onCheckedChange={(checked) => 
                setEatingHabits(prev => ({ ...prev, healthyDiet: checked }))
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Symptoms</h3>
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
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300"
      >
        Analyze Health
      </Button>
    </Card>
  );
};
