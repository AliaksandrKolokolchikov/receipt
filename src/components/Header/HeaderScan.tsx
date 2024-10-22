import { useState } from 'react';

import { HEADER } from '../../assets';
import { HeaderPopUpScan } from './HeaderPopUpScan.tsx';

export const HeaderScan = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="self-start min-w-40">
        <button
          onClick={handleButtonClick}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full shadow-md"
        >
          <img src={HEADER.QR} alt="QR Icon" width={16} height={16} />
          <span className="text-sm">Get the app</span>
        </button>

        {showPopup && <HeaderPopUpScan onClick={handleClosePopup} />}
      </div>
    </>
  );
};
