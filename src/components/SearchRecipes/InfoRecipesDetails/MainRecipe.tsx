import { SEARCH } from '../../../assets';
import { InfoButtonWrapper } from './InfoButtonWrapper.tsx';
import { useRecipeDetails } from '../../../hooks';

export const MainRecipe = () => {
  const { recipe, loading, error } = useRecipeDetails();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading recipe: {error}</p>;
  }

  if (!recipe) {
    return <p>No recipe found.</p>;
  }

  return (
    <div className="flex-1 bg-black">
      <div className="flex">
        <div className="flex flex-col">
          <img
            className="w-[400px] h-[350px]"
            src={recipe.thumbnail_url}
            alt={recipe.name}
          />
        </div>
        <div className="flex flex-col pl-11 pt-10">
          <span className="text-[48px] text-white pb-5">{recipe.name}</span>

          <div className="flex justify-between items-center">
            <div className="flex gap-2 border bg-[#FFFFFF1A] max-w-[105px] h-[30px] rounded-full justify-center items-center opacity-50 p-2">
              <img src={SEARCH.TIME} alt="SEARCH.TIME" />
              <span className="text-[14px] font-semibold text-[#FFFFFF]">
                {recipe.cook_time_minutes} mins
              </span>
            </div>
            <div className="flex gap-2 text-white">
              <img
                className="w-6"
                src={SEARCH.NEGATIVE}
                alt={SEARCH.NEGATIVE}
              />
              <p className="hover:text-gray-500 cursor-pointer">
                {recipe.user_ratings.count_positive}
              </p>
              <img
                className="w-6 rotate-180"
                src={SEARCH.NEGATIVE}
                alt={SEARCH.NEGATIVE}
              />
              <p className="hover:text-gray-500 cursor-pointer">
                {recipe.user_ratings.count_negative}
              </p>
            </div>
          </div>

          <p className="text-[18px] text-white pt-5 pb-[188px] max-w-[670px]">
            {recipe.description}
          </p>
          <InfoButtonWrapper />
        </div>
      </div>
    </div>
  );
};
