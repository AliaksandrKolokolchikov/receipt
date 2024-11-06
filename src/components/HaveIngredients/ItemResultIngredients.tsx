import { HAVE_INGREDIENTS } from '../../types';

type Props = {
  recipe: HAVE_INGREDIENTS;
};
export const ItemResultIngredients = ({ recipe }: Props) => {
  return (
    <>
      <div>
        <ul>
          <li key={recipe.id} className="relative">
            <div className="relative ">
              <img
                className="rounded-2xl max-w-[3000px] "
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
