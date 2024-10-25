import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constans';
import { RECIPE } from '../../types';

type Props = {
  recipe: RECIPE;
};

export const ItemSearchRecipes = ({ recipe }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${ROUTES.SEARCH}/${recipe.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="px-5 pt-10 font-[Inter] cursor-pointer"
    >
      <ul>
        <li key={recipe.id} className="relative">
          <div className="relative">
            <img
              className="rounded-2xl w-[350px] h-[350px]"
              src={recipe.thumbnail_url}
              alt={recipe.name}
            />
            <div className="absolute inset-0 flex flex-col justify-end">
              <p className="text-white text-lg font-bold bg-black bg-opacity-50 px-2 py-1 rounded">
                {recipe.name}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
