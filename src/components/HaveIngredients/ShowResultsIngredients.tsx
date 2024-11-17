import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { ItemResultIngredients } from './ItemResultIngredients.tsx';

export const ShowResultsIngredients = () => {
  const { recipes, loading, error } = useSelector(
    (state: RootState) => state.haveIngredients,
  );

  return (
    <>
      <div className="pt-5">
        {loading && <p className="text-center text-gray-400">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && recipes.length > 0 && (
          <div className="flex flex-wrap gap-5 items-center justify-center">
            {recipes.map((item) => (
              <ItemResultIngredients key={item.id} recipe={item} />
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
