import { Link } from "react-router-dom";

export const Landing = () => {
  const initStorage = () => {
    localStorage.setItem("Aciertos", "" + 0);
    localStorage.setItem("Errores", "" + 0);
  };

  return (
    <div className="min-h-[100vh] w-full flex flex-col  justify-center items-center align-middle bg-center bg-[url('https://images6.alphacoders.com/328/thumb-1920-328013.jpg')]">
      <div className="relative">
        <Link to="/home">
          <button
            onClick={initStorage}
            type="button"
            className="nes-btn p-[25px] mx-[30px] text-[15px] duration-300 inset-0 sm:text-[25px] sm:p-[35px]"
          >
            Que empliece la fiesta!
          </button>
        </Link>
      </div>
    </div>
  );
};
