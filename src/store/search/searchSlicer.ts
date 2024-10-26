import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RECIPE } from '../../types';

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

// Функция для получения списка рецептов с использованием RapidAPI
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
            tags: searchQuery, // используем переданный параметр для тегов
          },
          headers: {
            'x-rapidapi-key':
              'f6feab3252msh1b4dd811d3476d9p1283dfjsnbd963aa886de', // Вставьте сюда ваш ключ
            'x-rapidapi-host': 'tasty.p.rapidapi.com',
          },
        },
      );

      console.log(response.data.results);

      // Возвращаем результаты, если они есть
      return response.data.results || [];
    } catch (error) {
      console.error(error); // Выводим ошибку в консоль для отладки
      if (axios.isAxiosError(error) && error.response) {
        // Обрабатываем ошибки, если ответ сервера есть
        return rejectWithValue(
          error.response.data.message || 'Error fetching recipes',
        );
      }
      return rejectWithValue('Network Error');
    }
  },
);

// Функция для получения деталей рецепта по ID
export const fetchRecipeDetails = createAsyncThunk(
  'recipes/fetchRecipeDetails',
  async (recipeId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://tasty.p.rapidapi.com/recipes/get-more-info`,
        {
          params: { id: recipeId },
          headers: {
            'x-rapidapi-key':
              'f6feab3252msh1b4dd811d3476d9p1283dfjsnbd963aa886de', // Вставьте сюда ваш ключ
            'x-rapidapi-host': 'tasty.p.rapidapi.com',
          },
        },
      );

      console.log(response.data);

      return response.data; // Возвращаем данные рецепта
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
        state.error = null;
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
        state.error = null;
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
