import { useRandomDetails } from '../../hooks/useRandomDetails.tsx';

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
    <div className="text-center pt-8">
      <>
        <img
          src={winningRecipe.image}
          alt="Winning recipe"
          className="mx-auto max-w-[400px] max-h-[350px] rounded-lg shadow-md"
        />
      </>
      <p className="text-gray-400">Рецепт не найден.</p>
    </div>
  );
};
