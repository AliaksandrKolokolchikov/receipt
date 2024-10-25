import { useLocation } from 'react-router-dom';

import { ROUTES } from '../../constans';
import { MainPage, SearchRecipe } from '../../pages';

export const MainBlock = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case ROUTES.MAIN:
        return <div className="text-white">sdsd</div>;
      case ROUTES.SEARCH:
        return <SearchRecipe />;
      case ROUTES.SALE:
        return <div className="text-white">Sale Page Content</div>;
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
