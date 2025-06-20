export type NutritionalInfo = {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
  sugar: number;
};

export type MenuItem = {
  name: string;
  description: string;
  plans: ("Diet" | "Protein" | "Royal")[];
  mealTypes: ("Breakfast" | "Lunch" | "Dinner")[];
  nutrition: NutritionalInfo;
  allergenFree: boolean;
  allergenInfo: string;
  image: string;
};
