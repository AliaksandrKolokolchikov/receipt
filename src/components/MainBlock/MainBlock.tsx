import { useLocation } from 'react-router-dom';

import { ROUTES } from '../../constans';
import { MainPage, RandomPage, SearchRecipe } from '../../pages';
import { HaveIngredients } from '../HaveIngredients';

export const MainBlock = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case ROUTES.MAIN:
        return <HaveIngredients />;
      case ROUTES.SEARCH:
        return <SearchRecipe />;
      case ROUTES.RANDOM:
        return <RandomPage />;
      default:
        return <MainPage />;
    }
  };

  return (
    <div className="bg-black w-full h-full">
      <div className="flex-1 bg-black p-12">{renderContent()}</div>
    </div>
  );
};
