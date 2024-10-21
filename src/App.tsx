import { Route, Routes } from 'react-router-dom';

import { ROUTES } from './constans';
import { MainPage } from './pages';

export const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.MAIN} element={<MainPage />} />
      <Route path={ROUTES.SEARCH} element={<MainPage />} />
      <Route path={ROUTES.SALE} element={<MainPage />} />
    </Routes>
  );
};
