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

  const [errors, setErrors] = useState(0);
  const [hits, setHits] = useState(0);

  const currentHits: any = localStorage.getItem("Aciertos");
  const currentErrors: any = localStorage.getItem("Errores");

  const parsedHits: any = parseInt(currentHits);
  const parsedErrors: any = parseInt(currentErrors);

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
    const regex = /\s+/g;

    if ((e.key && e.key == "Enter") || e.target.value == "guessButton") {
      if (input.toLowerCase().replace(regex, "") == currentPokemon.name) {
        alert("Adivinaste!");
        setGuessStatus(true);
        setInput("");
        localStorage.setItem("Aciertos", parsedHits + 1);
        setHits(parsedHits + 1);
      } else {
        alert("Inténtalo otra vez!");
        setInput("");
        setGuessStatus(false);
        localStorage.setItem("Errores", parsedErrors + 1);
        setErrors(parsedErrors + 1);
      }
    }
  };

  const restartGame = () => {
    fetchPokemon();
    setGuessStatus(false);
  };

  const resetScore = () => {
    localStorage.setItem("Aciertos", "" + 0);
    localStorage.setItem("Errores", "" + 0);
    setErrors(0);
    setHits(0);
  };

  useEffect(() => {
    fetchPokemon();
    if (localStorage.getItem("Aciertos") === null) {
      localStorage.setItem("Aciertos", "" + 0);
    } else {
      setHits(parsedHits);
    }
    if (localStorage.getItem("Errores") === null) {
      localStorage.setItem("Errores", "" + 0);
    } else {
      setErrors(parsedErrors);
    }
  }, []);

  useEffect(() => {
    console.log(currentPokemon);
  }, [currentPokemon]);

  return (
    <div className=" min-h-[100vh] flex flex-col gap-[100px] items-center bg-center bg-[url('https://wallpaperset.com/w/full/3/4/1/519411.jpg')]">
      <div className="flex flex-col mt-[30px] sm:mt-[70px]">
        <div className="flex gap-1 ">
          <div className="nes-container w-[140px] sm:w-[250px] is-dark with-title is-centered">
            <p className=" text-[10px] sm:text-[15px] sm:mb-[5px] sm: ml-[-5px]">
              Aciertos
            </p>
            <p className="text-green-500">{hits}</p>
          </div>
          <div className="nes-container w-[140px]  sm:w-[250px] is-dark with-title is-centered">
            <p className="text-[10px] sm:text-[15px] sm:mb-[5px]">Errores</p>
            <p className="text-red-500">{errors}</p>
          </div>
        </div>
        <button
          onClick={resetScore}
          className="nes-btn w-[290px] sm:w-[512px] h-[50px] text-[12px] sm:text-[17px] is-error duration-300"
        >
          Reiniciar Puntaje
        </button>
      </div>
      {!guessStatus ? (
        <span className="nes-text bg-zinc-800 mt-[-70px] sm:mt-[-30px] mb-[-50px] text-white text-[13px] sm:text-[25px]">
          Quién es este Pokemon?
        </span>
      ) : (
        <div className="mb-[-100px] mt-[-70px] sm:mt-[-30px]">
          <div className="text-center nes-text bg-green-900 text-white text-[13px] mx-[25px] sm:text-[25px]">
            Muy bien! Descubriste a {currentPokemon.name}!
          </div>
          <Confetti numberOfPieces={250} gravity={2.1} recycle={false} />
        </div>
      )}
      {currentPokemon.name !== "" && (
        <img
          className={
            guessStatus
              ? "size-[300px] sm:size-[400px]"
              : "filter saturate-100 brightness-0 size-[300px] sm:size-[400px]"
          }
          src={currentPokemon.image}
          draggable="false"
          alt="PokemonIMG"
        />
      )}
      
      {!guessStatus ? (
        <div className="flex w-[300px] sm:w-[500px] mt-[-80px] mb-[70px]">
          <input
            type="text"
            className="nes-input max-w-[500px] h-[40px] sm:h-[50px] outline-none border-solid border-5"
            onChange={handleInputChange}
            onKeyDown={guessPokemon}
            value={input}
          />
          <button
            onClick={guessPokemon}
            value="guessButton"
            type="button"
            className="nes-btn h-[40px] sm:text-[20px] sm:h-[50px] text-[12px] is-primary"
          >
            adivinar
          </button>
        </div>
      ) : (
        <div className="mt-[-50px]">
          <button className="nes-btn duration-300" onClick={restartGame}>
            Volver a jugar
          </button>
        </div>
      )}
    </div>
  );
};
