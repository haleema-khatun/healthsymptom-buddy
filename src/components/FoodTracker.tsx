
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { motion } from "framer-motion";
import type { FoodItem } from "@/services/foodTracker";
import { foodCategories, commonFoodItems } from "@/services/foodTracker";

export const FoodTracker = () => {
  const [dailyFoods, setDailyFoods] = useState<FoodItem[]>([]);
  const [newFood, setNewFood] = useState<Partial<FoodItem>>({
    name: "",
    category: "other",
    servings: 1,
    timeOfDay: "breakfast"
  });

  const handleAddFood = () => {
    if (newFood.name) {
      const foodItem: FoodItem = {
        id: Date.now().toString(),
        name: newFood.name,
        category: newFood.category || "other",
        servings: newFood.servings || 1,
        timeOfDay: newFood.timeOfDay || "breakfast"
      };
      
      setDailyFoods(prev => [...prev, foodItem]);
      setNewFood({
        name: "",
        category: "other",
        servings: 1,
        timeOfDay: "breakfast"
      });
    }
  };

  return (
    <Card className="w-full max-w-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Daily Food Tracker</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Food Name</label>
            <Input
              value={newFood.name}
              onChange={(e) => setNewFood(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter food name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select
              className="w-full h-10 px-3 border rounded-md"
              value={newFood.category}
              onChange={(e) => setNewFood(prev => ({ ...prev, category: e.target.value as FoodItem['category'] }))}
            >
              {foodCategories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Servings</label>
            <Input
              type="number"
              min={0.5}
              step={0.5}
              value={newFood.servings}
              onChange={(e) => setNewFood(prev => ({ ...prev, servings: parseFloat(e.target.value) }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Time of Day</label>
            <select
              className="w-full h-10 px-3 border rounded-md"
              value={newFood.timeOfDay}
              onChange={(e) => setNewFood(prev => ({ ...prev, timeOfDay: e.target.value as FoodItem['timeOfDay'] }))}
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
        </div>

        <Button
          onClick={handleAddFood}
          className="w-full"
        >
          Add Food
        </Button>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Today's Food Log</h3>
          <div className="space-y-3">
            {dailyFoods.map((food, index) => (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-800">{food.name}</h4>
                  <p className="text-sm text-gray-600">
                    {food.servings} serving(s) - {food.timeOfDay}
                  </p>
                </div>
                <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                  {food.category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
