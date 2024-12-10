import React from 'react';

type KeyboardProps = {
  onKeyPress: (key: string) => void;
  keyColors: { [key: string]: string };
};

const Keyboard = ({ onKeyPress, keyColors }: KeyboardProps) => {
  const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  const getKeyColor = (key: string) => {
    return keyColors[key] || "white";
  };

  return (
    <div className="flex flex-col gap-2">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center gap-1 sm:gap-2 flex-wrap"
        >
          {row.split("").map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-9 md:h-12 border border-gray-300 rounded-lg text-sm sm:text-base md:text-lg flex items-center justify-center`}
              style={{ backgroundColor: getKeyColor(key) }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className="flex justify-center gap-1 sm:gap-2 mt-2 flex-wrap">
        <button
          onClick={() => onKeyPress("ENTER")}
          className="w-16 sm:w-20 md:w-24 h-8 sm:h-10 md:h-12 bg-blue-500 text-white border border-gray-300 rounded-lg text-sm sm:text-base md:text-lg"
        >
          Enviar
        </button>
        <button
          onClick={() => onKeyPress("BACKSPACE")}
          className="w-16 sm:w-20 md:w-24 h-8 sm:h-10 md:h-12 bg-gray-400 text-white border border-gray-300 rounded-lg text-sm sm:text-base md:text-lg"
        >
          Apagar
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
