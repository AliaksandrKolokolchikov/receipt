export type instructions = {
  display_text: string; // Название ингредиента
  position: number; // Количество
};

export type RECIPE = {
  id: number | string; // Идентификатор рецепта
  name: string; // Название блюда
  thumbnail_url: string;
  cook_time_minutes: number;
  instructions: instructions[];
};

export type RECIPE_DATA = {
  recipes?: RECIPE[];
};
export type RecipeHit = {
  recipes: RECIPE;
};
