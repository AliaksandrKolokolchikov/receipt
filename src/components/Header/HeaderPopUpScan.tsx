import { QRCodeSVG } from 'qrcode.react';

type Props = {
  onClick: () => void;
};
export const HeaderPopUpScan = ({ onClick }: Props) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <button
            onClick={onClick}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>

          <QRCodeSVG value="https://www.apple.com/app-store/" size={150} />
        </div>
      </div>
    </>
  );
};
