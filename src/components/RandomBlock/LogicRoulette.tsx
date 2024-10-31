import { useEffect, useState, useCallback } from 'react';
import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { RECIPE_RANDOM } from '../../types';

const reproductionArray = (
  array: RECIPE_RANDOM[],
  length = 0,
): RECIPE_RANDOM[] => [
  ...Array(length)
    .fill('_')
    .map(() => array[Math.floor(Math.random() * array.length)]),
];

export const LogicRoulette = () => {
  const [prizes, setPrizes] = useState<RECIPE_RANDOM[]>([]);
  const [start, setStart] = useState(false);
  const [winningRecipe, setWinningRecipe] = useState<RECIPE_RANDOM | null>(
    null,
  );
  const [prizeIndex, setPrizeIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrize = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/recipes');
        const fetchedPrizes = response.data.recipes.map(
          (item: RECIPE_RANDOM) => ({
            ...item,
            id: uuidv4(),
          }),
        );

        const reproducedPrizeList = [
          ...fetchedPrizes,
          ...reproductionArray(fetchedPrizes, fetchedPrizes.length * 3),
          ...fetchedPrizes,
          ...reproductionArray(fetchedPrizes, fetchedPrizes.length),
        ].map((item) => ({ ...item, id: uuidv4() }));

        setPrizes(reproducedPrizeList);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchPrize();
  }, []);

  const handleStart = useCallback(() => {
    const randomIndex = prizes.length
      ? Math.floor(Math.random() * prizes.length)
      : 0;
    setPrizeIndex(randomIndex);
    setStart(true);
    setWinningRecipe(null);
  }, [prizes]);

  const handlePrizeDefined = useCallback(() => {
    if (prizeIndex !== null) {
      setWinningRecipe(prizes[prizeIndex]);
    }
    setStart(false);
  }, [prizes, prizeIndex]);

  return (
    <div className="flex flex-col items-center bg-black text-white p-4">
      <div className="relative w-full max-w-[800px] mb-4">
        <div className="relative z-0">
          <RoulettePro
            prizes={prizes}
            prizeIndex={prizeIndex ?? 0}
            start={start}
            onPrizeDefined={handlePrizeDefined}
          />
        </div>

        <div className="absolute top-0 bottom-0 left-1/2 w-[4px] h-full bg-orange-500 transform -translate-x-1/2 pointer-events-none z-10"></div>
      </div>

      <button
        onClick={handleStart}
        className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-lg mt-4"
      >
        Start
      </button>

      {winningRecipe && (
        <div className="winning-recipe text-center mt-8">
          <h2 className="text-lg font-semibold mb-2">
            Поздравляем! Вы выиграли рецепт:
          </h2>
          <h3 className="text-sm mb-4">
            {winningRecipe.prepTimeMinutes} минут на приготовление
          </h3>
          <img
            src={winningRecipe.image}
            alt="Winning recipe"
            className="mx-auto max-w-[200px] max-h-[150px] rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
};
