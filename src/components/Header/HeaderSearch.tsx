import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { HEADER } from '../../assets';
import { ShowResultsSearch } from '../SearchRecipes';
import { AppDispatch } from '../../store';
import { fetchRecipes } from '../../store/search';

export const HeaderSearch = () => {
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleShowResults = () => {
    if (search.trim() !== '') {
      dispatch(fetchRecipes(search));
      setShowResults(true);
    }
  };
  return (
    <div className="w-full">
      <div className="relative flex items-center border border-gray-700 rounded-full w-full max-w-[400px] h-10 bg-[#171717]">
        <img className="ml-3 opacity-50 w-5 h-5" src={HEADER.LOUP} alt="Loup" />
        <div className="flex-grow ml-2">
          <input
            className="w-full h-full px-3 text-white bg-[#171717] focus:outline-none rounded-full"
            type="search"
            name="search"
            placeholder="What's cooking?"
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={handleShowResults}
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full ml-3 h-full"
        >
          Show
        </button>
      </div>

      {showResults && <ShowResultsSearch />}
    </div>
  );
};
