import { HeaderSearch } from './HeaderSearch.tsx';
import { HeaderScan } from './HeaderScan.tsx';

export const Header = () => {
  return (
    <div className="w-full flex justify-between items-center ">
      <HeaderSearch />
      <HeaderScan />
    </div>
  );
};
