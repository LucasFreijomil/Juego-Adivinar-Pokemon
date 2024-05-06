import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className="min-h-[100vh] w-full flex flex-col justify-center items-center align-middle bg-[url('https://images6.alphacoders.com/328/thumb-1920-328013.jpg')]">
      <div className=" relative">
        <Link to="/home">
          <button type="button" className="nes-btn p-[15px] duration-300 inset-0">
            Que empliece la fiesta!
          </button>
        </Link>
      </div>
    </div>
  );
};
