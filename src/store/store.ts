import { configureStore } from '@reduxjs/toolkit';

import { recipeReducer } from './search';
import { randomReducer } from './random';
import { haveIngredientsReducer } from './haveIngredients';

export const store = configureStore({
  reducer: {
    recipeData: recipeReducer,
    randomRecipe: randomReducer,
    haveIngredients: haveIngredientsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
