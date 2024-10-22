import { Header, ItemSearchRecipes } from '../components';
import { RecipeHit } from '../types';

type SearchRecipeProps = {
  recipes: RecipeHit[]; // Ожидаем массив рецептов
};

export const SearchRecipe = ({ recipes }: SearchRecipeProps) => {
  return (
    <>
      <Header />
      {recipes.length > 0 ? (
        <ItemSearchRecipes recipe={recipes[10]} />
      ) : (
        <p>No recipes available</p>
      )}
    </>
  );
};
