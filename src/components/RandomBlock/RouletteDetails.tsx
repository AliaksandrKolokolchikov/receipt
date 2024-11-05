import { useState } from 'react';

import { NavAside } from '../Header';
import { RouletteRecipe } from './RouletteRecipe.tsx';

export const RouletteDetails = () => {
  const [activePage, setActivePage] = useState<string>('random');

  return (
    <div className="flex bg-black font-[Inter]">
      <NavAside activePage={activePage} setActivePage={setActivePage} />
      <RouletteRecipe />
    </div>
  );
};
