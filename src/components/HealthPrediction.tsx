
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface HealthPredictionProps {
  prediction: {
    condition: string;
    confidence: number;
    dietRecommendations: string[];
  };
}

export const HealthPrediction = ({ prediction }: HealthPredictionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg"
    >
      <Card className="p-6 bg-white shadow-lg rounded-xl">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Predicted Condition</h3>
            <p className="text-2xl font-semibold text-gray-800 mt-1">{prediction.condition}</p>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">Confidence</span>
              <span className="text-sm font-medium text-gray-700">{prediction.confidence}%</span>
            </div>
            <Progress value={prediction.confidence} className="h-2" />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Dietary Recommendations</h3>
            <ul className="space-y-3">
              {prediction.dietRecommendations?.map((recommendation, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  </span>
                  <span className="text-gray-700">{recommendation}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
