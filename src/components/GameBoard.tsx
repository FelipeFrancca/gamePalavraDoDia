import React from "react";

type GameBoardProps = {
  attempts: string[][];
  currentGuess: string[];
  correctWord: string;
};

const GameBoard = ({ attempts, currentGuess, correctWord }: GameBoardProps) => {
  const MAX_ATTEMPTS = 6;
  const WORD_LENGTH = 5;

  const board = [...attempts];
  if (board.length < MAX_ATTEMPTS) {
   
    board.push([...currentGuess, ...Array(WORD_LENGTH - currentGuess.length).fill("")]);
  }

  while (board.length < MAX_ATTEMPTS) {
   
    board.push(Array(WORD_LENGTH).fill(""));
  }

  return (
    <div className="grid gap-2">
  {board.map((row, rowIndex) => (
    <div
      key={rowIndex}
      className="flex gap-1 justify-center"
    >
      {row.map((cell, colIndex) => (
        <div
          key={colIndex}
          className={`w-8 h-8 md:w-10 md:h-10 border-2 flex items-center justify-center text-sm md:text-xl font-bold ${
            attempts[rowIndex] && rowIndex < attempts.length
              ? correctWord[colIndex] === cell
                ? "bg-green-500 text-white"
                : correctWord.includes(cell)
                ? "bg-yellow-500 text-white"
                : "bg-gray-300"
              : "bg-neutral-300"
          }`}
        >
          {cell}
        </div>
      ))}
    </div>
  ))}
</div>

  );
};

export default GameBoard;
