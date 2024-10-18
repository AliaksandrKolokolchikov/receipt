import { HEADER } from '../../assets';

export const HeaderSearch = () => {
  return (
    <>
      <div className="flex items-center border rounded-full w-[400px] h-[45px] bg-[#171717]">
        <img className="ml-3" src={HEADER.HOME} alt="Loup" />
        <div className="grow ml-2">
          <input
            className="w-full h-[42px] focus:outline-none rounded-full text-white bg-[#171717]"
            type="search"
            name="search"
            placeholder="What's cooking?"
            autoComplete="off"
          />
        </div>
      </div>
    </>
  );
};
