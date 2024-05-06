import { useEffect, useState } from "react";
import randomPokemon from "../../api";
import Confetti from "react-confetti";

export const Home = () => {
  const [currentPokemon, setCurrentPokemon] = useState({
    id: 0,
    name: "",
    image: "",
  });

  const [input, setInput] = useState("");

  const [guessStatus, setGuessStatus] = useState(false);

  const fetchPokemon = () => {
    randomPokemon
      .random()
      .then((pokemon) => {
        setCurrentPokemon(pokemon);
      })
      .catch((error) => {
        console.error(
          "Ocurrió un error al obtener el Pokemon aleatorio:",
          error
        );
      });
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setInput(value);
  };

  const guessPokemon = (e: any) => {
    if ((e.key && e.key == "Enter") || e.target.value == "guessButton") {
      if (input === currentPokemon.name) {
        alert("Adivinaste!");
        setGuessStatus(true);
        setInput("");
      } else {
        alert("Inténtalo otra vez!");
        setInput("");
      }
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    if (currentPokemon.name !== "") console.log(currentPokemon);
  }, [currentPokemon]);

  return (
    <div className="min-h-[100vh] w-full flex flex-col gap-[100px] justify-center items-center align-middle bg-[url('https://wallpaperset.com/w/full/3/4/1/519411.jpg')]">
      <span className="nes-text mb-[-100px] text-white text-[30px]">
        Quién es este Pokemon?
      </span>
      {currentPokemon.name !== "" && (
        <img
          className={
            guessStatus
              ? "size-[500px]"
              : "filter saturate-100 brightness-0 size-[500px]"
          }
          src={currentPokemon.image}
          alt="PokemonIMG"
        />
      )}
      {guessStatus && (
        <div>
          {/* <div className="text-center nes-text mt-[-150px] mb-[50px] text-[25px]">
            Muy bien! Descubriste a {currentPokemon.name}!
          </div>
          <Confetti numberOfPieces={250} gravity={2.1} recycle={false} /> */}
        </div>
      )}
      <div className="flex mt-[-100px]">
        <input
          type="text"
          className="nes-input max-w-[500px] outline-none border-solid border-5"
          onChange={handleInputChange}
          onKeyDown={guessPokemon}
          value={input}
        />
        <button
          onClick={guessPokemon}
          value="guessButton"
          type="button"
          className="nes-btn is-primary"
        >
          adivinar
        </button>
      </div>
    </div>
  );
};
