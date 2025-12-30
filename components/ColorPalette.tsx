
import React from 'react';
import { COLORS } from '../constants';

interface ColorPaletteProps {
  selectedColor: string;
  onSelect: (color: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ selectedColor, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center p-4 bg-white rounded-3xl shadow-xl border-4 border-yellow-400 max-w-2xl mx-auto">
      {COLORS.map((color) => (
        <button
          key={color.hex}
          onClick={() => onSelect(color.hex)}
          className={`w-12 h-12 rounded-full border-4 transition-transform hover:scale-110 active:scale-90 ${
            selectedColor === color.hex ? 'border-gray-800 shadow-inner' : 'border-transparent shadow-md'
          }`}
          style={{ backgroundColor: color.hex }}
          title={color.name}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
