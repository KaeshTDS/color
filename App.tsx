
import React, { useState } from 'react';
import DrawingCanvas from './components/DrawingCanvas';
import ColorPalette from './components/ColorPalette';
import AIPrompt from './components/AIPrompt';
import { BRUSH_SIZES } from './constants';
import { ToolType } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<{ url: string; prompt: string } | null>(null);
  const [brushColor, setBrushColor] = useState('#ef4444');
  const [brushSize, setBrushSize] = useState(15);
  const [tool, setTool] = useState<ToolType>('brush');
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePageGenerated = (url: string, prompt: string) => {
    setCurrentPage({ url, prompt });
  };

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8">
      {/* Header */}
      <header className="py-8 text-center space-y-2">
        <h1 className="text-5xl md:text-6xl font-black text-blue-600 drop-shadow-md">
          Gemini <span className="text-yellow-500">Color</span>Magic
        </h1>
        <p className="text-lg text-gray-700 font-semibold italic">
          Imagine anything, and we'll turn it into a coloring book!
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        {/* Step 1: Prompt */}
        <AIPrompt 
          onGenerated={handlePageGenerated} 
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />

        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
          {/* Step 2: Canvas */}
          <div className="space-y-6">
            <DrawingCanvas 
              backgroundImageUrl={currentPage?.url || 'https://picsum.photos/1024/1024?grayscale&blur=10'} 
              brushColor={brushColor}
              brushSize={brushSize}
              tool={tool}
            />
            <ColorPalette selectedColor={brushColor} onSelect={setBrushColor} />
          </div>

          {/* Sidebar Controls */}
          <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-purple-400 space-y-8 h-full">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-purple-600 flex items-center gap-2">
                🎨 Tools
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setTool('brush')}
                  className={`flex-1 py-3 rounded-2xl font-bold transition-all ${
                    tool === 'brush' ? 'bg-purple-500 text-white shadow-inner' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
                >
                  Brush 🖌️
                </button>
                <button
                  onClick={() => setTool('eraser')}
                  className={`flex-1 py-3 rounded-2xl font-bold transition-all ${
                    tool === 'eraser' ? 'bg-purple-500 text-white shadow-inner' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
                >
                  Eraser 🧽
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-purple-600">
                📏 Size
              </h3>
              <div className="flex justify-between items-center gap-2">
                {BRUSH_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setBrushSize(size)}
                    className={`rounded-full transition-transform active:scale-90 ${
                      brushSize === size ? 'ring-4 ring-purple-500 bg-purple-100' : 'bg-gray-100'
                    }`}
                    style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <div 
                      style={{ 
                        width: size * 0.8, 
                        height: size * 0.8, 
                        backgroundColor: '#6b7280', 
                        borderRadius: '50%' 
                      }} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-purple-100">
              <p className="text-xs text-gray-400 text-center">
                Built with Gemini AI<br/>for young explorers
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer hint */}
      {!currentPage && !isGenerating && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[-1] opacity-20">
          <div className="text-9xl animate-bounce">🎨</div>
        </div>
      )}
    </div>
  );
};

export default App;
