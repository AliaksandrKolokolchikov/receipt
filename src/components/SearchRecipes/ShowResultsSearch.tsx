import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { ItemSearchRecipes } from './ItemSearchRecipes.tsx';
import { RecipeHit } from '../../types';

export const ShowResultsSearch = () => {
  const { recipes, loading, error } = useSelector(
    (state: RootState) => state.recipeData,
  );

  return (
    <>
      <div className="mt-8">
        {loading && <p className="text-center text-gray-400">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && recipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recipes.map((item: RecipeHit) => (
              <ItemSearchRecipes key={item.recipe.uri} recipe={item} />
            ))}
          </div>
        )}
        {!loading && recipes.length === 0 && (
          <p className="text-center text-gray-400">No results found</p>
        )}
      </div>
    </>
  );
};
