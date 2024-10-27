type Props = {
  onClick?: () => void;
  selectedType: boolean;
  label: string;
};
export const WrapperField = ({ onClick, selectedType, label }: Props) => {
  return (
    <>
      <div
        onClick={onClick}
        className={`cursor-pointer ${selectedType ? 'text-white border-b' : 'text-gray-600'}`}
      >
        <p>{label}</p>
      </div>
    </>
  );
};
