import { RECIPE } from '../../types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type RecipeHit = {
  recipe: RECIPE;
};

type SearchState = {
  recipes: RecipeHit[];
  error: string | null;
  loading: boolean;
};

const initialState: SearchState = {
  recipes: [],
  error: null,
  loading: false,
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (searchQuery: string, { rejectWithValue }) => {
    try {
      const APP_ID = '9d69b4d9';
      const APP_KEY = '2add3ab8d786ee8089d78ea2ba9c7dae';
      const response = await axios.get(
        `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`,
      );
      return response.data.hits;
    } catch (error) {
      return rejectWithValue('Error fetching recipes');
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
        state.error = null;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      });
  },
});
// типизация
// createAsunc запрос
// createslice
// create extrareducer
export const recipeReducer = recipesSlice.reducer;
