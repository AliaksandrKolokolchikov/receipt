export type instructions = {
  display_text: string;
  position: number;
};

export type nutrition = {
  calories: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  protein: number;
  sugar: number;
};

export type RECIPE = {
  id: number | string;
  name: string;
  thumbnail_url: string;
  cook_time_minutes: number;
  instructions: instructions[];
  nutrition: nutrition;
  description: string;
  original_video_url: string;
  user_ratings: {
    count_negative: number;
    count_positive: number;
  };
};

export enum BUTTON_INFO {
  RECIPE = 'recipe',
  NUTRITION = 'nutrition',
}

export type RECIPE_RANDOM = {
  id: number | string;
  prepTimeMinutes: number;
  image: string;
  name: string;
  instructions: string[];
  userId: number;
  ingredients: [];
  rating: number;
};

export type HAVE_INGREDIENTS = {
  id: number | string;
  title: string;
  image: string;
  likes: number;
  summary: string[];
  instructions: string[];
  readyInMinutes: number;
  aggregateLikes: number;
};
