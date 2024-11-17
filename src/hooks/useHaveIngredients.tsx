import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchHaveRecipeDetails } from '../store/haveIngredients';
import { AppDispatch, RootState } from '../store';

export const useHaveIngredients = () => {
  const { recipes, recipeDetails, loading, error } = useSelector(
    (state: RootState) => state.haveIngredients,
  );
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const haveIngredients =
    recipeDetails || recipes.find((recipe) => recipe.id === String(id));

  useEffect(() => {
    if (!recipeDetails && id && !loading) {
      dispatch(fetchHaveRecipeDetails(id));
    }
  }, [id, recipeDetails, loading, dispatch]);

  return { haveIngredients, loading, error };
};
