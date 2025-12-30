
import React, { useState } from 'react';
import { generateColoringPage } from '../services/gemini';

interface AIPromptProps {
  onGenerated: (url: string, prompt: string) => void;
  isGenerating: boolean;
  setIsGenerating: (loading: boolean) => void;
}

const AIPrompt: React.FC<AIPromptProps> = ({ onGenerated, isGenerating, setIsGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setError(null);
    try {
      const url = await generateColoringPage(prompt);
      onGenerated(url, prompt);
      setPrompt('');
    } catch (err) {
      setError("Oops! The magic pencil broke. Try again?");
    } finally {
      setIsGenerating(false);
    }
  };

  const suggestions = ["A happy dinosaur", "A space cat", "A princess castle", "A magic garden"];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What should we color today? (e.g. A flying turtle)"
          className="flex-1 px-6 py-4 rounded-full border-4 border-blue-400 focus:border-blue-500 outline-none text-lg font-medium shadow-lg"
          disabled={isGenerating}
        />
        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className={`px-8 py-4 rounded-full bg-blue-500 text-white font-bold text-lg shadow-lg transition-all hover:bg-blue-600 active:scale-95 disabled:opacity-50 flex items-center gap-2`}
        >
          {isGenerating ? (
            <>
              <span className="animate-spin">🌀</span> Generating...
            </>
          ) : (
            <>Create ✨</>
          )}
        </button>
      </form>

      {error && <p className="text-red-500 font-bold text-center animate-bounce">{error}</p>}

      <div className="flex flex-wrap gap-2 justify-center">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setPrompt(s)}
            className="px-3 py-1 bg-white rounded-full border border-blue-200 text-blue-500 text-sm hover:bg-blue-50 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AIPrompt;
