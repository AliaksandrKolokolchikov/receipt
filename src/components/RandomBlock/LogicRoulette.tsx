import { useEffect, useState } from 'react';
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

  const prizeIndex = prizes.length
    ? Math.floor(Math.random() * prizes.length)
    : 0;

  const handleStart = () => {
    setStart(true);
    setWinningRecipe(null); // Сброс выигравшего рецепта перед началом
  };

  const handlePrizeDefined = () => {
    setWinningRecipe(prizes[prizeIndex]); // Сохраняем выигравший рецепт
    setStart(false);
  };

  return (
    <>
      <RoulettePro
        prizes={prizes}
        prizeIndex={prizeIndex}
        start={start}
        onPrizeDefined={handlePrizeDefined}
      />
      <button onClick={handleStart}>Start</button>

      {winningRecipe && (
        <div className="winning-recipe">
          <h2>Поздравляем! Вы выиграли рецепт:</h2>
          <h3>{winningRecipe.prepTimeMinutes} минут на приготовление</h3>
          <img
            src={winningRecipe.image}
            alt="Winning recipe"
            className="max-w-[200px] max-h-[150px]"
          />
        </div>
      )}
    </>
  );
};
