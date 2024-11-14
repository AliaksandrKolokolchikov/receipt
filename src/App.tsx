import { Route, Routes } from 'react-router-dom';

import { ROUTES } from './constans';
import { MainPage } from './pages';
import { InfoRecipesDetails, RouletteDetails } from './components';
import { IngredientsDetails } from './components/HaveIngredients/IngredientsDetails.tsx';

export const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.MAIN} element={<MainPage />} />
      <Route path={ROUTES.SEARCH} element={<MainPage />} />
      <Route path={ROUTES.RANDOM} element={<MainPage />} />
      <Route path={`${ROUTES.SEARCH}/:id`} element={<InfoRecipesDetails />} />
      <Route path={`${ROUTES.RANDOM}/:id`} element={<RouletteDetails />} />
      <Route path={`${ROUTES.SEARCH}/:id`} element={<IngredientsDetails />} />
    </Routes>
  );
};
