import { useHaveIngredients } from '../../hooks';
import { SEARCH } from '../../assets';

export const WrapperIngredients = () => {
  const { haveIngredients, error, loading } = useHaveIngredients();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading recipe: {error}</p>;
  if (!haveIngredients) return <p>No recipe found.</p>;

  return (
    <div className="flex pt-8 w-full">
      <>
        <div className="flex flex-col">
          <img
            src={haveIngredients.image}
            alt="Winning recipe"
            className="mx-auto max-w-[400px] max-h-[350px] rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col pl-11 text-white px-6">
          <h1 className="text-white text-[38px]">{haveIngredients.title}</h1>

          <div className="flex justify-between items-center">
            <div className="flex gap-2 border bg-[#FFFFFF1A] max-w-[105px] h-[30px] rounded-full justify-center items-center opacity-50 p-2 my-5">
              <img src={SEARCH.TIME} alt="SEARCH.TIME" />
              <span className="text-[14px] font-semibold text-[#FFFFFF]">
                {haveIngredients.readyInMinutes} mins
              </span>
            </div>
            <div className="flex items-center gap-2 flex-row">
              <img
                className="w-6"
                src={SEARCH.NEGATIVE}
                alt={SEARCH.NEGATIVE}
              />
              <p>{haveIngredients.aggregateLikes} </p>
            </div>
          </div>

          <h2 className="text-[25px] pb-2 text-yellow-300 uppercase">
            Ingredients:
          </h2>

          <p className="text-white">{haveIngredients.summary}</p>

          <h2 className="pt-10 text-[25px] text-yellow-300 uppercase">
            Instructions:
          </h2>
          <p className="text-white">{haveIngredients.instructions}</p>
        </div>
      </>
    </div>
  );
};
