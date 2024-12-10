import React, { useEffect, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import Keyboard from "./Keyboard.tsx";
import GameBoard from "./GameBoard.tsx";
import LoveImg from "../assets/img/love.png";
import UsImg from "../assets/img/us.png";

const words = ["PADRE", "ANEIS", "NOIVA"];

export default function Game() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [attempts, setAttempts] = useState([] as string[][]);
  const [currentGuess, setCurrentGuess] = useState([] as string[][]);
  const [gameOver, setGameOver] = useState(false);
  const [phaseScore, setPhaseScore] = useState(300);
  const [totalScore, setTotalScore] = useState(0);
  const [showTransition, setShowTransition] = useState(false);
  const [keyColors, setKeyColors] = useState({} as Record<string, string>);
  const [showGiftScreen, setShowGiftScreen] = useState(false);
  const [showBestOptionScreen, setShowBestOptionScreen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({
    top: "21.6%",
    left: "70%",
  });

  const handleKeyPress = useCallback(
    (key: string) => {
      if (key === "ENTER" && currentGuess.length === 5) {
        const newAttempts = [...attempts, currentGuess];
        setAttempts(newAttempts);

        const correctWord = words[currentWordIndex];
        const newKeyColors = { ...keyColors };

        currentGuess.forEach((letter) => {
          if (correctWord.includes(letter)) {
            newKeyColors[letter] = "yellow";
          } else {
            newKeyColors[letter] = "red";
          }
        });

        setKeyColors(newKeyColors);

        if (currentGuess.join("") === correctWord) {
          setTotalScore((prev) => prev + phaseScore);
          confetti({ spread: 90, particleCount: 100 });
          setShowTransition(true);

          setTimeout(() => {
            if (currentWordIndex === words.length - 1) {
              setGameOver(true);
            } else {
              setCurrentWordIndex((prev) => prev + 1);
              setAttempts([]);
              setCurrentGuess([]);
              setPhaseScore(300);
              setKeyColors({});
            }
            setShowTransition(false);
          }, 3000);
        } else if (newAttempts.length === 6) {
          setPhaseScore(0);
          setGameOver(true);
        } else {
          setCurrentGuess([]);
          setPhaseScore((prev) => Math.max(prev - 50, 0));
        }
      } else if (key === "BACKSPACE") {
        setCurrentGuess(currentGuess.slice(0, -1));
      } else if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
        setCurrentGuess([...currentGuess, key]);
      }
    },
    [currentGuess, attempts, currentWordIndex, keyColors, phaseScore]
  ); // Dependências do handleKeyPress

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (key === "BACKSPACE" || key === "ENTER" || /^[A-Z]$/.test(key)) {
        handleKeyPress(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyPress]); // Agora o handleKeyPress é uma dependência constante

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (key === "BACKSPACE" || key === "ENTER" || /^[A-Z]$/.test(key)) {
        handleKeyPress(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentGuess, attempts, handleKeyPress]);

  useEffect(() => {
    if (showBestOptionScreen) {
      const intervalId = setInterval(() => {
        confetti({
          spread: 120,
          particleCount: 100,
          origin: { x: Math.random(), y: Math.random() * 0.5 },
        });
      }, 1000);

      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
      }, 4000);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [showBestOptionScreen]);

  const handleGiftClick = () => setShowGiftScreen(true);
  const handleYesClick = () => setShowBestOptionScreen(true);

  const handleNoClick = () => {
    const randomTop = Math.random() * 80 + 10;
    const randomLeft = Math.random() * 80 + 10;
    setButtonPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  if (showTransition) {
    return (
      <div className="w-96 h-96 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">
          Parabéns! Você acertou a palavra!
        </h1>
        <p className="mt-4 text-lg">Pontuação da fase: {phaseScore}</p>
        <p className="mt-2 text-lg">Começando a próxima fase...</p>
      </div>
    );
  }

  if (gameOver && !showGiftScreen) {
    return (
      <div className="w-80 h-96 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Fim de Jogo!</h1>
        <p className="mt-4 text-xl">Pontuação Total: {totalScore}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Jogar Novamente
        </button>

        {totalScore > 0 && (
          <button
            onClick={handleGiftClick}
            className="mt-4 flex items-center px-4 py-2 bg-pink-500 text-white rounded"
          >
            Parabéns! <br />
            Resgate seu presente 🎁
          </button>
        )}
      </div>
    );
  }

  if (showGiftScreen && !showBestOptionScreen) {
    return (
      <div className="w-96 h-96 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6">Quer casar comigo?</h1>
        <img className="w-52 p-5" src={LoveImg} alt="Flork amoroso" />
        <div className="relative w-full flex items-center space-x-4 p-5">
          <button
            onClick={handleYesClick}
            className="px-6 py-3 bg-green-500 text-white text-lg rounded"
          >
            Sim
          </button>

          <button
            onClick={handleNoClick}
            className="px-6 py-3 bg-red-500 text-white text-lg rounded absolute"
            style={buttonPosition}
          >
            Não
          </button>
        </div>
      </div>
    );
  }

  if (showBestOptionScreen) {
    return (
      <div className="w-96 h-96 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold items-center flex justify-center">
          Escolheu a melhor opção!
        </h1>
        <img className="w-64" src={UsImg} alt="Flork juntos" />
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Jogar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
      <div className="flex flex-col items-center">
        <GameBoard
          attempts={attempts}
          currentGuess={currentGuess}
          correctWord={words[currentWordIndex]}
        />
        <div className="mt-8">
          <p className="text-lg font-bold">
            Pontuação atual da fase: {phaseScore}
          </p>
          <Keyboard onKeyPress={handleKeyPress} keyColors={keyColors} />
        </div>
      </div>
    </div>
  );
}
