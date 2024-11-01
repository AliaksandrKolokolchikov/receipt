import { useNavigate } from 'react-router-dom';

import { RECIPE_RANDOM } from '../../types';
import { ROUTES } from '../../constans';

type Props = {
  winningRecipe: RECIPE_RANDOM;
};
export const RouletteWrapper = ({ winningRecipe }: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${ROUTES.RANDOM}/${winningRecipe.name}`);
  };

  return (
    <>
      <div className="text-center mt-8">
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
      <button
        onClick={handleClick}
        className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-lg mt-4"
      >
        More Information...
      </button>
    </>
  );
};
