import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';

import { useRandomLogic } from '../../hooks';
import { RouletteWrapper } from './RouletteWrapper.tsx';

export const Roulette = () => {
  const {
    prizes,
    prizeIndex,
    start,
    handleStart,
    handlePrizeDefined,
    winningRecipe,
  } = useRandomLogic();

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

      {winningRecipe && <RouletteWrapper winningRecipe={winningRecipe} />}
    </div>
  );
};
