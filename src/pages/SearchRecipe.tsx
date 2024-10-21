import { Header, ItemSearchRecipes } from '../components';
import { RECIPE } from '../types';

type Props = {
  recipe: RecipeHit;
};
interface RecipeHit {
  recipe: RECIPE;
}
export const SearchRecipe = ({ recipe }: Props) => {
  return (
    <>
      <Header />
      <ItemSearchRecipes recipe={recipe} />
    </>
  );
};
