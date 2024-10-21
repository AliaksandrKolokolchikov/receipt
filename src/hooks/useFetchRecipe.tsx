import { useEffect, useState } from 'react';
import axios from 'axios';

import { RECIPE } from '../types';

interface RecipeHit {
  recipe: RECIPE;
}

const APP_ID = '9d69b4d9'; // Replace with your app_id
const APP_KEY = '2add3ab8d786ee8089d78ea2ba9c7dae';

export const useFetchRecipe = (searchQuery: string) => {
  const [recipes, setRecipe] = useState<RecipeHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!searchQuery) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`,
        );
        setRecipe(response.data.hits);
      } catch (error) {
        setError('Error fetching recipes');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [searchQuery]);

  return { recipes, loading, error };
};
