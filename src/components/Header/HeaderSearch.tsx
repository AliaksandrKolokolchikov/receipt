import { HEADER } from '../../assets';
import { useState } from 'react';
import { ItemSearchRecipes } from '../SearchRecipes';
import { useFetchRecipe } from '../../hooks';

export const HeaderSearch = () => {
  const [search, setSearch] = useState('');
  const { recipes, loading, error } = useFetchRecipe(search);
  const [showResults, setShowResults] = useState(false);

  const handleShowResults = () => {
    if (search.trim() !== '') {
      setShowResults(true);
    }
  };

  return (
    <div className="">
      <div className="relative flex items-center border border-gray-700 rounded-full w-full max-w-lg h-12 bg-[#171717]">
        <img className="ml-3 opacity-50 w-5 h-5" src={HEADER.LOUP} alt="Loup" />
        <div className="flex-grow ml-2">
          <input
            className="w-full h-full px-3 text-white bg-[#171717] focus:outline-none rounded-full"
            type="search"
            name="search"
            placeholder="What's cooking?"
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Обновляем поисковый запрос
          />
        </div>
        <button
          onClick={handleShowResults}
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full ml-3 h-full"
        >
          Show
        </button>
      </div>

      {showResults && (
        <div className="mt-8">
          {loading && <p className="text-center text-gray-400">Loading...</p>}

          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && recipes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recipes.map((item) => (
                <ItemSearchRecipes key={item.recipe.uri} recipe={item} />
              ))}
            </div>
          )}

          {!loading && recipes.length === 0 && (
            <p className="text-center text-gray-400">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};
