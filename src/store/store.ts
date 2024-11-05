import { configureStore } from '@reduxjs/toolkit';

import { recipeReducer } from './search/searchSlicer.ts';
import { randomReducer } from './random/randomSlicer.ts';

export const store = configureStore({
  reducer: {
    recipeData: recipeReducer,
    randomRecipe: randomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
