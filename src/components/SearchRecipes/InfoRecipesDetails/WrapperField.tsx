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
        className={`${selectedType ? 'text-white' : 'text-gray-600'}`}
      >
        <p>{label}</p>
      </div>
    </>
  );
};
