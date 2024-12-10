import React, { useState } from "react";
import Game from './components/Game.tsx';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      {!gameStarted ? (
        <div className="w-full max-w-md p-6 bg-blue-200 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Palavra do Dia #141</h1>
          <div className="flex justify-center mb-6">
            <div className="flex flex-wrap justify-center gap-2">
              <div className="w-8 h-8 bg-white border border-black rounded-full"></div>
              <div className="w-8 h-8 bg-black border border-black rounded-full"></div>
              <div className="w-8 h-8 bg-white border border-black rounded-full"></div>
              <div className="w-8 h-8 bg-black border border-black rounded-full"></div>
              <div className="w-8 h-8 bg-white border border-black rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-700 mb-6">
            Nós escolhemos 3 palavras e as separamos em 3 fases, da mais fácil
            para a mais difícil. Seu desafio é acertar todas e fazer o maior
            número de pontos possível.
          </p>
          <button
            onClick={startGame}
            className="px-4 py-2 bg-white text-black border border-black rounded-lg hover:bg-gray-200"
          >
            Jogar
          </button>
        </div>
      ) : (
        <Game />
      )}
    </div>
  );
}
