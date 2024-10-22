export type RECIPE = {
  image: string;
  uri: string;
  label: string;
  totalWeight: number;
  id: number;
};

export type RECIPE_DATA = {
  recipes: RecipeHit[];
};
export type RecipeHit = {
  recipe: RECIPE;
};
