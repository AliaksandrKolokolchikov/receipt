import { useState } from 'react';
import { NavAside } from '../Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeDetails } from '../../store/search';
import { AppDispatch, RootState } from '../../store';

export const IngredientsDetails = () => {
  const [activePage, setActivePage] = useState('/home');
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, recipeDetails } = useSelector(
    (state: RootState) => state.haveIngredients,
  );

  const handleRecipeClick = (recipeId: string) => {
    dispatch(fetchRecipeDetails(recipeId));
  };

  return (
    <>
      <NavAside activePage={activePage} setActivePage={setActivePage} />;
      <div>
        <h2>Recipes</h2>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id} onClick={() => handleRecipeClick}>
              {recipe.title}
            </li>
          ))}
        </ul>

        {recipeDetails && (
          <div>
            <h3>{recipeDetails.title}</h3>
          </div>
        )}
      </div>
    </>
  );
};
