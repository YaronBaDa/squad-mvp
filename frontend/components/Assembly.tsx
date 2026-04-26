'use client';

import { useEffect, useState } from 'react';
import { useDemoSocket } from './DemoSocketProvider';

interface AssemblyProps {
  config: any;
  onComplete: (projectId: string) => void;
}

const AGENTS = [
  { emoji: '🛡️', name: 'Alex', role: 'The Captain' },
  { emoji: '🎨', name: 'Maya', role: 'The Architect' },
  { emoji: '💻', name: 'Jordan', role: 'The Builder' },
  { emoji: '🔐', name: 'Sam', role: 'The Gatekeeper' },
  { emoji: '🗺️', name: 'Taylor', role: 'The Cartographer' },
  { emoji: '🚀', name: 'Riley', role: 'The Pilot' },
  { emoji: '📢', name: 'Casey', role: 'The Voice' },
  { emoji: '📊', name: 'Quinn', role: 'The Scout' },
];

export default function Assembly({ config, onComplete }: AssemblyProps) {
  const { socket } = useDemoSocket();
  const [phase, setPhase] = useState(0);
  const [revealed, setRevealed] = useState<number[]>([]);

  const phases = [
    'Analyzing your mission profile',
    'Matching specialist skills',
    'Building your product map',
    'Calibrating communication style',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => {
        if (p >= phases.length - 1) {
          clearInterval(interval);
          return p;
        }
        return p + 1;
      });
    }, 900);

    // Reveal agents one by one
    AGENTS.forEach((_, i) => {
      setTimeout(() => {
        setRevealed((prev) => [...prev, i]);
      }, 800 + i * 300);
    });

    // Start project
    if (socket) {
      socket.emit('start_project', config);
      socket.on('project_created', ({ projectId }: { projectId: string }) => {
        setTimeout(() => onComplete(projectId), 1500);
      });
    }

    return () => clearInterval(interval);
  }, [socket]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-4">
      {/* Bouncing dots */}
      <div className="flex gap-2 mb-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-aurora rounded-full animate-bounce-dot"
            style={{ animationDelay: `${i * 0.16}s` }}
          />
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">Assembling your Squad...</h2>
      <p className="text-nebula text-sm mb-12">{phases[phase]}</p>

      {/* Agent cards */}
      <div className="flex flex-wrap justify-center gap-4 max-w-lg">
        {AGENTS.map((agent, i) => (
          <div
            key={agent.name}
            className={`bg-surface border border-panel rounded-xl p-4 min-w-[120px] transition-all duration-500 ${
              revealed.includes(i)
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-90'
            }`}
          >
            <div className="text-3xl mb-2">{agent.emoji}</div>
            <div className="font-semibold text-sm">{agent.name}</div>
            <div className="text-xs text-nebula">{agent.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
