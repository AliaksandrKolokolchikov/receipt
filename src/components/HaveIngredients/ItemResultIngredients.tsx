import { useNavigate } from 'react-router-dom';

import { HAVE_INGREDIENTS } from '../../types';
import { ROUTES } from '../../constans';

type Props = {
  recipe: HAVE_INGREDIENTS;
};

export const ItemResultIngredients = ({ recipe }: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${ROUTES.HAVE}/${recipe.id}`);
  };

  return (
    <>
      <div onClick={handleClick}>
        <ul>
          <li key={recipe.id} className="relative">
            <div className="relative ">
              <img
                className="rounded-2xl max-w-[300px] "
                src={recipe.image}
                alt={recipe.title}
              />
              <div className="absolute inset-0 flex flex-col justify-end">
                <p className="text-white text-lg font-bold bg-black bg-opacity-50 px-2 py-1 rounded w">
                  {recipe.title}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
