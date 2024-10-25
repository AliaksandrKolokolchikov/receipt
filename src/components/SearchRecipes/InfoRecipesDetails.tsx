import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { NavAside } from '../Header';
import { fetchRecipes } from '../../store/search/searchSlicer.ts';

export const InfoRecipesDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, loading, error } = useSelector(
    (state: RootState) => state.recipeData,
  );
  const [activePage, setActivePage] = useState<string>('search');
  const navigate = useNavigate();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!fetched && recipes.length === 0 && !loading) {
      dispatch(fetchRecipes('')); // Используем id из параметра
      setFetched(true);
    }
  }, [dispatch, id, recipes.length, loading, fetched]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching recipes: {error}</p>;
  }

  const recipe = recipes.find((r) => r.id === Number(id));

  if (!recipe) {
    navigate('/');
    return null;
  }

  return (
    <div className="flex font-[Inter]">
      <NavAside activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 bg-black">
        <div className="flex">
          <div className="flex flex-col">
            <img src={recipe.thumbnail_url} alt={recipe.name} />
          </div>
          <div className="flex flex-col pl-11 pt-10">
            <span className="text-[48px] text-white">{recipe.name}</span>
            <span className="text-[14px] font-semibold text-[#FFFFFF]">
              {recipe.cook_time_minutes} mins
            </span>
            <div className="flex flex-col">
              <h1 className="text-white">Ingredients</h1>
              <div className="text-white">
                {recipe.instructions.map((step, index) => (
                  <p key={index}>{step.display_text}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
