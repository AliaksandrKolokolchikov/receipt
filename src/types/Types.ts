export type instructions = {
  display_text: string;
  position: number;
};

export type RECIPE = {
  id: number | string;
  name: string;
  thumbnail_url: string;
  cook_time_minutes: number;
  instructions: instructions[];
  description: string;
  original_video_url: string;
};

export type RECIPE_DATA = {
  recipes?: RECIPE[];
};
export type RecipeHit = {
  recipes: RECIPE;
};

export enum BUTTON_INFO {
  RECIPE = 'recipe',
  NUTRITION = 'nutrition',
}
