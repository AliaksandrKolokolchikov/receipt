import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RECIPE_RANDOM } from '../../types';

type RandomState = {
  recipes: RECIPE_RANDOM[];
  error: string | null;
  loading: boolean;
};

const initialState: RandomState = {
  recipes: [],
  error: null,
  loading: false,
};

export const fetchRecipesRandom = createAsyncThunk(
  'fetchRandom',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://dummyjson.com/recipes');

      console.log(response.data.recipes);
      return response.data.recipes;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
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
      });
  },
});

export const randomReducer = randomSlice.reducer;
