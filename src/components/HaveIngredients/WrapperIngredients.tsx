import { useHaveIngredients } from '../../hooks/useHaveIngredients.tsx';

export const WrapperIngredients = () => {
  const { haveIngredients, error, loading } = useHaveIngredients();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading recipe: {error}</p>;
  }

  if (!haveIngredients) {
    return <p>No recipe found.</p>;
  }
  return (
    <div>
      <p>{haveIngredients.title}</p>
      <img src={haveIngredients.image} alt="" />
    </div>
  );
};
