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
        <p className="font-semibold pt-5 text-yellow-400">
          Nutrient content per 100 grams:
        </p>
        <div className="text-white flex flex-col gap-2 pt-5">
          <ul>
            <li>
              <p>
                Calories:
                <span className="text-gray-500 ml-2">
                  {recipe.nutrition.calories}
                </span>
              </p>
            </li>
            <li>
              <p>
                Carbohydrates:
                <span className="text-gray-500 ml-2 ">
                  {recipe.nutrition.carbohydrates}
                </span>
              </p>
            </li>
            <li>
              <p>
                Fat:
                <span className="text-gray-500 ml-2">
                  {recipe.nutrition.fat}
                </span>
              </p>
            </li>
            <li>
              <p>
                Fiber:
                <span className="text-gray-500 ml-2">
                  {recipe.nutrition.fiber}
                </span>
              </p>
            </li>
            <li>
              <p>
                Protein:
                <span className="text-gray-500 ml-2">
                  {recipe.nutrition.protein}
                </span>
              </p>
            </li>
            <li>
              <p>
                Sugar:
                <span className="text-gray-500 ml-2">
                  {recipe.nutrition.sugar}
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
