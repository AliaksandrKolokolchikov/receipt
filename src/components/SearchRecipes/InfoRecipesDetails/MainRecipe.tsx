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
            className="max-w-[450px] max-h-[400px]"
            src={recipe.thumbnail_url}
            alt={recipe.name}
          />
        </div>
        <div className="flex flex-col pl-11 pt-10">
          <span className="text-[48px] text-white pb-5">{recipe.name}</span>

          <div className="flex gap-2 border bg-[#FFFFFF1A] max-w-[94px] h-[30px] rounded-full justify-center items-center opacity-50">
            <img src={SEARCH.TIME} alt="SEARCH.TIME" />
            <span className="text-[14px] font-semibold text-[#FFFFFF]">
              {recipe.cook_time_minutes} mins
            </span>
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
