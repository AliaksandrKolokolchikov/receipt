import { useState } from 'react';

import { Recipe } from './Recipe.tsx';
import { WrapperField } from './WrapperField.tsx';
import { Nutrition } from './Nutrition.tsx';
import { BUTTON_INFO } from '../../../types';

export const InfoButtonWrapper = () => {
  const [selected, setSelected] = useState<BUTTON_INFO>(BUTTON_INFO.RECIPE);

  const renderInfoButton = () => {
    switch (selected) {
      case BUTTON_INFO.RECIPE:
        return <Recipe />;
      case BUTTON_INFO.NUTRITION:
        return <Nutrition />;
      default:
        return <Recipe />;
    }
  };

  return (
    <>
      <div className="flex gap-4 text-white text-[20px]">
        <WrapperField
          onClick={() => setSelected(BUTTON_INFO.RECIPE)}
          selectedType={selected === BUTTON_INFO.RECIPE}
          label="Recipe"
        />

        <WrapperField
          selectedType={selected === BUTTON_INFO.NUTRITION}
          label="Nutrition"
          onClick={() => setSelected(BUTTON_INFO.NUTRITION)}
        />
      </div>
      <div className=" text-white">{renderInfoButton()}</div>
    </>
  );
};
