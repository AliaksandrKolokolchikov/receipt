import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { HEADER } from '../../assets';
import { ROUTES } from '../../constans';

type Props = {
  activePage: string;
  setActivePage: (page: string) => void;
};

export const NavAside = ({ activePage, setActivePage }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Home', icon: HEADER.HOME, key: 'home', route: ROUTES.MAIN },
    { name: 'Search', icon: HEADER.LOUP, key: 'search', route: ROUTES.SEARCH },
    { name: 'Random', icon: HEADER.SALE, key: 'random', route: ROUTES.RANDOM },
  ];

  useEffect(() => {
    const activeItem = menuItems.find(
      (item) => item.route === location.pathname,
    );
    if (activeItem && activeItem.key !== activePage) {
      setActivePage(activeItem.key);
    }
  }, [location.pathname, activePage, setActivePage]);

  const handleMenuClick = (route: string, key: string) => {
    if (key !== activePage) {
      setActivePage(key);
      navigate(route);
    }
  };

  return (
    <div className="w-[105px] min-h-[984px] bg-[#000000] font-Inter border-r border-[#171717]">
      <div className="w-full h-full">
        <div className="py-10 pl-5">
          <img
            className="cursor-pointer"
            src={HEADER.LOGO}
            alt="Logo"
            onClick={() => handleMenuClick(ROUTES.MAIN, 'home')}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
          {menuItems.map((item) => (
            <img
              key={item.key}
              src={item.icon}
              alt={item.name}
              className={`cursor-pointer ${
                activePage === item.key ? 'opacity-100' : 'opacity-30'
              }`}
              onClick={() => handleMenuClick(item.route, item.key)}
            />
          ))}
          <button className="w-12 h-8 bg-[#FFFFFF1A] rounded-full">
            <p className="font-bold text-[12px] text-white">EN</p>
          </button>
          <img src={HEADER.INSTA} alt="INSTA" />
          <img src={HEADER.TIKTOC} alt="TIKTOC" />
          <img src={HEADER.YT} alt="YT" />
        </div>
      </div>
    </div>
  );
};
