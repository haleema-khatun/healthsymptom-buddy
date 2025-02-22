
export interface FoodItem {
  id: string;
  name: string;
  category: 'fruits' | 'vegetables' | 'proteins' | 'grains' | 'dairy' | 'snacks' | 'other';
  servings: number;
  timeOfDay: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface DailyFoodLog {
  date: string;
  foods: FoodItem[];
}

export const foodCategories = [
  'fruits',
  'vegetables',
  'proteins',
  'grains',
  'dairy',
  'snacks',
  'other'
] as const;

export const commonFoodItems: Partial<FoodItem>[] = [
  { name: 'Apple', category: 'fruits' },
  { name: 'Banana', category: 'fruits' },
  { name: 'Broccoli', category: 'vegetables' },
  { name: 'Carrots', category: 'vegetables' },
  { name: 'Chicken', category: 'proteins' },
  { name: 'Fish', category: 'proteins' },
  { name: 'Rice', category: 'grains' },
  { name: 'Bread', category: 'grains' },
  { name: 'Milk', category: 'dairy' },
  { name: 'Yogurt', category: 'dairy' },
  { name: 'Chips', category: 'snacks' },
  { name: 'Cookies', category: 'snacks' }
];
