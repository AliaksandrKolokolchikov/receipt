import { RecipeHit } from '../../types';

interface RecipeHitProps {
  recipe: RecipeHit;
}

export const ItemSearchRecipes = ({ recipe }: RecipeHitProps) => {
  if (!recipe || !recipe.recipe) {
    return <p>No recipe data available.</p>;
  }

  return (
    <div className="gap-10 px-5 pt-10 font-[Inter]">
      <ul>
        <li key={recipe.recipe.id}>
          <img
            width={250}
            src={recipe.recipe.image}
            alt={recipe.recipe.label}
          />
          <div>
            <p className="text-white max-w-[250px] flex justify-center">
              {recipe.recipe.label}
            </p>
            <p className="text-white flex justify-center gap-1 items-center">
              {Math.trunc(recipe.recipe.totalWeight)}
              <span>g</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};
