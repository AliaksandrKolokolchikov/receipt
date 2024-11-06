import { HAVE_INGREDIENTS } from '../../types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type HaveIngredientsState = {
  recipes: HAVE_INGREDIENTS[];
  error: string | null;
  loading: boolean;
};

const initialState: HaveIngredientsState = {
  recipes: [],
  error: null,
  loading: false,
};

export const fetchIngredients = createAsyncThunk(
  'fetchIngredients',
  async (ingredients: string) => {
    const API_KEY = 'f707787d25ed40ff992f1510f5549acc';
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients`,
      {
        params: {
          ingredients,
          number: 8,
          apiKey: API_KEY,
        },
      },
    );
    console.log(response.data);
    return response.data;
  },
);

const haveIngredientsSlice = createSlice({
  name: 'haveIngredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      });
  },
});

export const haveIngredientsReducer = haveIngredientsSlice.reducer;
