import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './constans';
import { MainPage } from './pages';
import { InfoRecipesDetails } from './components';

export const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.MAIN} element={<MainPage />} />
      <Route path={ROUTES.SEARCH} element={<MainPage />} />
      <Route path={ROUTES.SALE} element={<MainPage />} />
      <Route path={`${ROUTES.SEARCH}/:id`} element={<InfoRecipesDetails />} />
    </Routes>
  );
};
