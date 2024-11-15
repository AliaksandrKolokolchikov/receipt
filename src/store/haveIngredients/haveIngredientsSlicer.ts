import { HAVE_INGREDIENTS } from '../../types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type HaveIngredientsState = {
  recipes: HAVE_INGREDIENTS[];
  recipeDetails: HAVE_INGREDIENTS | null;
  error: string | null;
  loading: boolean;
};

const initialState: HaveIngredientsState = {
  recipes: [],
  error: null,
  loading: false,
  recipeDetails: null,
};

export const fetchIngredients = createAsyncThunk(
  'fetchIngredients',
  async (ingredients: string) => {
    const API_KEY = 'b76971c17e2b43259404d6f085c0ec3e';
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

export const fetchHaveRecipeDetails = createAsyncThunk(
  'fetchRecipeDetails',
  async (id: string) => {
    const API_KEY = 'b76971c17e2b43259404d6f085c0ec3e';
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information`,
        {
          params: {
            apiKey: API_KEY,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
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
      })
      .addCase(fetchHaveRecipeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHaveRecipeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.recipeDetails = action.payload;
      })
      .addCase(fetchHaveRecipeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const haveIngredientsReducer = haveIngredientsSlice.reducer;
