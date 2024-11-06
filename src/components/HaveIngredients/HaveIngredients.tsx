import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { HEADER } from '../../assets';
import { fetchIngredients } from '../../store/haveIngredients';
import { AppDispatch } from '../../store';
import { ShowResultsIngredients } from './ShowResultsIngredients.tsx';

export const HaveIngredients = () => {
  const [ingredients, setIngredients] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const handleSearchIngredients = () => {
    dispatch(fetchIngredients(ingredients));
  };

  return (
    <>
      <div className="w-full">
        <div className="relative flex items-center border border-gray-700 rounded-full w-full max-w-[400px] h-10 bg-[#171717]">
          <img
            className="ml-3 opacity-50 w-5 h-5"
            src={HEADER.LOUP}
            alt="Loup"
          />
          <div className="flex-grow ml-2">
            <input
              className="w-full h-full px-3 text-white bg-[#171717] focus:outline-none rounded-full"
              type="search"
              name="search"
              placeholder="What's cooking?"
              autoComplete="off"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>
          <button
            onClick={handleSearchIngredients}
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full ml-3 h-full"
          >
            Show
          </button>
        </div>

        {ingredients.length > 0 && <ShowResultsIngredients />}
      </div>
    </>
  );
};
