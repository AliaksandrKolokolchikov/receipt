import { useState } from 'react';

import { NavAside } from '../Header';
import { WrapperIngredients } from './WrapperIngredients.tsx';

export const IngredientsDetails = () => {
  const [activePage, setActivePage] = useState<string>('home');

  return (
    <div className="flex bg-black font-[Inter]">
      <NavAside activePage={activePage} setActivePage={setActivePage} />
      <WrapperIngredients />
    </div>
  );
};
