import { useState } from 'react';

import { NavAside } from '../../Header';
import { MainRecipe } from './MainRecipe.tsx';

export const InfoRecipesDetails = () => {
  const [activePage, setActivePage] = useState<string>('search');

  return (
    <div className="flex font-[Inter]">
      <NavAside activePage={activePage} setActivePage={setActivePage} />
      <MainRecipe />
    </div>
  );
};
