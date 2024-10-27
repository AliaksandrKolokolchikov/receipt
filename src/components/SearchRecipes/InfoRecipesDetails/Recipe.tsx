import { useRecipeDetails } from '../../../hooks';

export const Recipe = () => {
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
    <>
      <div className="flex flex-col">
        <div className="text-white ">
          {recipe.instructions.map((item) => (
            <div
              key={item.display_text}
              className="border-b h-[120px] w-[787px] flex items-center last:border-none"
            >
              <p>{item.position}.</p>
              <p className="m-3">{item.display_text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
