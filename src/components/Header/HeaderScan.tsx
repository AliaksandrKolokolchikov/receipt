import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

import { HEADER } from '../../assets';

export const HeaderScan = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleButtonClick}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full shadow-md"
      >
        <img src={HEADER.QR} alt="QR Icon" width={20} height={20} />
        <span>Get the app</span>
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={handleClosePopup}
            >
              ✕
            </button>

            <QRCodeSVG value="https://www.apple.com/app-store/" size={150} />
          </div>
        </div>
      )}
    </div>
  );
};
