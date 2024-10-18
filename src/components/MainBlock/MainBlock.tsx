import { useLocation } from 'react-router-dom';

import { ROUTES } from '../../constans';
import { TEST } from '../TEST.tsx';
import { MainPage } from '../../pages';

export const MainBlock = () => {
  const location = useLocation();

  const renderContent = () => {
    const currentPage = location.pathname;
    switch (currentPage) {
      case ROUTES.MAIN_NESTED:
        return <TEST />;
      case ROUTES.SEARCH:
        return <div className="text-white">Search Page Content</div>;
      case ROUTES.SALE:
        return <div>Sale Page Content</div>;
      default:
        return <MainPage />;
    }
  };

  return (
    <div className="bg-black w-full h-full">
      <div className="text-white">dsds</div>
      <div className="flex-1 bg-black p-12">{renderContent()}</div>
    </div>
  );
};
