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
      } else {
        alert("Inténtalo otra vez!");
        setInput("");
        fetchPokemon();
        setGuessStatus(false);
        localStorage.setItem("Errores", parsedErrors + 1);
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
    window.location.reload();
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className="min-h-[100vh] w-full flex flex-col gap-[100px] justify-center items-center align-middle bg-[url('https://wallpaperset.com/w/full/3/4/1/519411.jpg')]">
      <div className="flex flex-col">
        <div className="flex mt-[-70px] gap-1 ">
          <div className="nes-container is-dark with-title is-centered">
            <p className="title bg-transparent">Aciertos</p>
            <p className="text-green-500">{parsedHits}</p>
          </div>
          <div className="nes-container is-dark with-title is-centered">
            <p className="title">Errores</p>
            <p className="text-red-500">{parsedErrors}</p>
          </div>
        </div>
        <button onClick={resetScore} className="nes-btn is-error duration-300">Reiniciar Puntaje</button>
      </div>
      {!guessStatus && (
        <span className="nes-text mb-[-100px] text-white text-[30px]">
          Quién es este Pokemon?
        </span>
      )}
      {currentPokemon.name !== "" && (
        <img
          className={
            guessStatus
              ? "size-[500px]"
              : "filter saturate-100 brightness-0 size-[500px]"
          }
          src={currentPokemon.image}
          draggable="false"
          alt="PokemonIMG"
        />
      )}
      {guessStatus && (
        <div className="mb-[-100px]">
          <Confetti numberOfPieces={250} gravity={2.1} recycle={false} />
          <div className="text-center nes-text mt-[-120px] mb-[-100px] text-white text-[25px]">
            Muy bien! Descubriste a {currentPokemon.name}!
          </div>
        </div>
      )}
      {!guessStatus ? (
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
