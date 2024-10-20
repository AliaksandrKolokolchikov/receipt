import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './constans';
import { MainPage } from './pages';

export const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.MAIN_NESTED} element={<MainPage />} />
    </Routes>
  );
};
