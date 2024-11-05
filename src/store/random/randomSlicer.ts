import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RECIPE_RANDOM } from '../../types';
import { RootState } from '../store.ts';

type RandomState = {
  recipes: RECIPE_RANDOM[];
  error: string | null;
  loading: boolean;
  recipeDetails: RECIPE_RANDOM | null;
};

const initialState: RandomState = {
  recipes: [],
  error: null,
  loading: false,
  recipeDetails: null,
};

export const fetchRecipesRandom = createAsyncThunk(
  'fetchRandom',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://dummyjson.com/recipes');

      console.log(response.data.recipes);
      return response.data.recipes;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchRecipeRandomDetails = createAsyncThunk(
  'fetchRandomDetails',
  async (recipeId: number | string, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const existingRecipe =
      state.randomRecipe.recipes.find(
        (recipe) => recipe.name === String(recipeId),
      ) || state.randomRecipe.recipeDetails;

    if (existingRecipe && existingRecipe.name === String(recipeId)) {
      return existingRecipe;
    }
    try {
      const response = await axios.get(`https://dummyjson.com/recipes`);
      return response.data.recipes;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const randomSlice = createSlice({
  name: 'random',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipesRandom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipesRandom.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload as string;
      })
      .addCase(fetchRecipesRandom.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipeRandomDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeRandomDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRecipeRandomDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      });
  },
});

export const randomReducer = randomSlice.reducer;
