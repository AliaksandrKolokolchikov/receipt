import { useRecipeDetails } from '../../../hooks';

export const Nutrition = () => {
  const { recipe, loading, error } = useRecipeDetails();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading recipe: {error}</p>;
  }

  if (!recipe) {
    return <p>No recipe found.</p>;
  }

  return (
    <>
      <div>
        <p className="font-semibold pt-5 text-red-400">
          Nutrient content per 100 grams:
        </p>
        <div className="text-white flex flex-col gap-2 pt-5">
          <p>Calories:{recipe.nutrition.calories}</p>
          <p>Carbohydrates:{recipe.nutrition.carbohydrates}</p>
          <p>Fat:{recipe.nutrition.fat}</p>
          <p>Fiber:{recipe.nutrition.fiber}</p>
          <p>Protein:{recipe.nutrition.protein}</p>
          <p>Sugar:{recipe.nutrition.sugar}</p>
        </div>
      </div>
    </>
  );
};
