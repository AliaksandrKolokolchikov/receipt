import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { RECIPE_RANDOM } from '../types';
import { fetchRecipesRandom } from '../store/random/randomSlicer.ts';
import { AppDispatch } from '../store';

const reproductionArray = (
  array: RECIPE_RANDOM[],
  length = 0,
): RECIPE_RANDOM[] => [
  ...Array(length)
    .fill('_')
    .map(() => array[Math.floor(Math.random() * array.length)]),
];

export const useRandomLogic = () => {
  const [prizes, setPrizes] = useState<RECIPE_RANDOM[]>([]);
  const [start, setStart] = useState(false);
  const [winningRecipe, setWinningRecipe] = useState<RECIPE_RANDOM | null>(
    null,
  );
  const [prizeIndex, setPrizeIndex] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchRecipesRandom());
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

  return {
    handlePrizeDefined,
    handleStart,
    prizeIndex,
    prizes,
    start,
    winningRecipe,
  };
};
