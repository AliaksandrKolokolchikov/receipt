import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { ItemSearchRecipes } from './ItemSearchRecipes';
import { RECIPE } from '../../types';

export const ShowResultsSearch = () => {
  const { recipes, loading, error } = useSelector(
    (state: RootState) => state.recipeData,
  );

  return (
    <div className="mt-8">
      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && recipes.length > 0 && (
        <div className="flex flex-wrap items-center justify-center">
          {recipes.map((item: RECIPE) => (
            <ItemSearchRecipes key={item.id} recipe={item} />
          ))}
        </div>
      )}
      {!loading && recipes.length === 0 && (
        <p className="text-center text-gray-400">No results found</p>
      )}
    </div>
  );
};
