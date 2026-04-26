'use client';

import { useState, useRef, useEffect } from 'react';

interface SummonBarProps {
  onSend: (text: string) => void;
}

const QUICK_PROMPTS = [
  'What should I focus on next?',
  'Explain this simpler',
  'Show me what is being built',
];

export default function SummonBar({ onSend }: SummonBarProps) {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
    setExpanded(false);
  };

  const handlePrompt = (prompt: string) => {
    onSend(prompt);
    setExpanded(false);
  };

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 bg-surface border border-panel rounded-full flex items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 transition-all duration-300 ${
        expanded ? 'rounded-2xl p-3 flex-col min-w-[480px]' : 'p-1.5'
      }`}
    >
      {expanded && (
        <div className="flex flex-wrap gap-2 mb-2 w-full">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => handlePrompt(p)}
              className="bg-panel text-lunar text-xs px-3 py-1.5 rounded-full hover:bg-aurora hover:text-void transition-colors whitespace-nowrap"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 w-full">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setExpanded(true)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Ask the Squad..."
          className="bg-transparent border-none text-starlight text-sm outline-none flex-1 min-w-[200px] placeholder-nebula"
        />
        <button
          onClick={handleSubmit}
          className="w-9 h-9 bg-aurora text-void rounded-full flex items-center justify-center text-lg hover:scale-105 transition-transform flex-shrink-0"
        >
          ↑
        </button>
      </div>
    </div>
  );
}
