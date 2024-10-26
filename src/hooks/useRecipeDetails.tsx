import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store';
import { fetchRecipeDetails } from '../store/search/searchSlicer';

export const useRecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { recipes, loading, error } = useSelector(
    (state: RootState) => state.recipeData,
  );

  const recipe = recipes.find((r) => r.id === Number(id));

  useEffect(() => {
    if (!recipe && id && !loading) {
      dispatch(fetchRecipeDetails(id));
    }
  }, [dispatch, id, recipe, loading]);

  return { recipe, loading, error };
};
