import { useRandomDetails } from '../../hooks/useRandomDetails.tsx';
import { SEARCH } from '../../assets';

export const RouletteRecipe = () => {
  const { winningRecipe, error, loading } = useRandomDetails();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading recipe: {error}</p>;
  }

  if (!winningRecipe) {
    return <p>No recipe found.</p>;
  }

  return (
    <div className="flex pt-8">
      <>
        <div className="flex flex-col">
          <img
            src={winningRecipe.image}
            alt="Winning recipe"
            className="mx-auto max-w-[400px] max-h-[350px] rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col pl-11 text-white">
          <h1 className="text-white text-[38px]">{winningRecipe.name}</h1>

          <div className="flex justify-between items-center">
            <div className="flex gap-2 border bg-[#FFFFFF1A] max-w-[105px] h-[30px] rounded-full justify-center items-center opacity-50 p-2 my-5">
              <img src={SEARCH.TIME} alt="SEARCH.TIME" />
              <span className="text-[14px] font-semibold text-[#FFFFFF]">
                {winningRecipe.prepTimeMinutes} mins
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img
                className="w-6"
                src={SEARCH.NEGATIVE}
                alt={SEARCH.NEGATIVE}
              />
              <p>{winningRecipe.rating} / 5</p>
            </div>
          </div>

          <h2 className="text-[25px] pb-2 text-yellow-300 uppercase">
            Ingredients:
          </h2>

          <div>
            {winningRecipe.ingredients.map((ingredient, index) => (
              <div key={`${ingredient}-${index}`}>
                <div className="flex gap-2">
                  <p className="text-yellow-300">{index + 1}.</p>
                  <p className="text-gray-400">{ingredient}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="pt-10 text-[25px] text-yellow-300 uppercase">
            Instructions:
          </h2>

          <div className="text-white">
            {winningRecipe.instructions.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="border-b h-[60px] max-w-[787px] flex items-center last:border-none"
              >
                <p>{index + 1}.</p>
                <p className="m-3">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    </div>
  );
};
