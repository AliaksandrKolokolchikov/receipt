import { useState } from 'react';

import { NavAside } from '../Header';
import { MainBlock } from './MainBlock.tsx';

export const MainContent = () => {
  const [activePage, setActivePage] = useState<string>('home');

  return (
    <div className="flex">
      <NavAside activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1">
        <MainBlock />
      </div>
    </div>
  );
};
