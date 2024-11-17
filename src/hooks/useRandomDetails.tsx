import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { fetchRecipeRandomDetails } from '../store/random';
import { AppDispatch, RootState } from '../store';

export const useRandomDetails = () => {
  const { recipes, recipeDetails, loading, error } = useSelector(
    (state: RootState) => state.randomRecipe,
  );
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const winningRecipe =
    recipeDetails?.name === String(id)
      ? recipeDetails
      : recipes.find((r) => r.name === String(id));

  useEffect(() => {
    if (!winningRecipe && id && !loading) {
      dispatch(fetchRecipeRandomDetails(id));
    }
  }, [dispatch, id, winningRecipe, loading]);

  return { winningRecipe, loading, error };
};
