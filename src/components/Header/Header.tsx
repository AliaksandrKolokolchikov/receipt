import { HeaderSearch } from './HeaderSearch.tsx';
import { HeaderScan } from './HeaderScan.tsx';

export const Header = () => {
  return (
    <div className="flex">
      <HeaderSearch />
      <HeaderScan />
    </div>
  );
};
