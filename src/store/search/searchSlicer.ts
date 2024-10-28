import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RECIPE } from '../../types';
import { RootState } from '../store.ts';

type SearchState = {
  recipes: RECIPE[];
  error: string | null;
  loading: boolean;
  recipeDetails: RECIPE | null;
};

const initialState: SearchState = {
  recipes: [],
  error: null,
  loading: false,
  recipeDetails: null,
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (searchQuery: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://tasty.p.rapidapi.com/recipes/list',
        {
          params: {
            from: '0',
            size: '20',
            tags: searchQuery,
          },
          headers: {
            'x-rapidapi-key':
              'ea402bcfadmshf16033b3f88b973p1fd447jsne16e02e40932',
            'x-rapidapi-host': 'tasty.p.rapidapi.com',
          },
        },
      );

      console.log(response.data.results);

      return response.data.results || [];
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.message || 'Error fetching recipes',
        );
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const fetchRecipeDetails = createAsyncThunk(
  'recipes/fetchRecipeDetails',
  async (recipeId: string | undefined, { getState, rejectWithValue }) => {
    const state = getState() as RootState;

    const existingRecipe =
      state.recipeData.recipes.find(
        (recipe) => recipe.id === Number(recipeId),
      ) || state.recipeData.recipeDetails;

    if (existingRecipe && existingRecipe.id === Number(recipeId)) {
      return existingRecipe;
    }

    try {
      const response = await axios.get(
        `https://tasty.p.rapidapi.com/recipes/get-more-info`,
        {
          params: { id: recipeId },
          headers: {
            'x-rapidapi-key':
              'ea402bcfadmshf16033b3f88b973p1fd447jsne16e02e40932',
            'x-rapidapi-host': 'tasty.p.rapidapi.com',
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching recipe details');
    }
  },
);

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipeDetails.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when starting a new fetch
      })
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.recipeDetails = action.payload;
      });
  },
});

export const recipeReducer = recipesSlice.reducer;
