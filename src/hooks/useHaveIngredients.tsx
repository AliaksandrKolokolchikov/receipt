import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { AppDispatch, RootState } from '../store';
import { fetchHaveRecipeDetails } from '../store/haveIngredients';

export const useHaveIngredients = () => {
  const { recipes, recipeDetails, loading, error } = useSelector(
    (state: RootState) => state.haveIngredients,
  );
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // Найти рецепт по id, если он есть в уже загруженных данных
  const haveIngredients =
    recipeDetails?.id === id
      ? recipeDetails
      : recipes.find((recipe) => recipe.id === Number(id));

  useEffect(() => {
    if (!haveIngredients && id && !loading) {
      dispatch(fetchHaveRecipeDetails(id));
    }
  }, [dispatch, id, haveIngredients, loading]);

  return { haveIngredients, loading, error };
};
