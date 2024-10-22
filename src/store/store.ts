import { configureStore } from '@reduxjs/toolkit';

import { recipeReducer } from './search/searchSlicer.ts';

export const store = configureStore({
  reducer: {
    recipeData: recipeReducer,
  },
});

// Типы для использования в компонентах
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
