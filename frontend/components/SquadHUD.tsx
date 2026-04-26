'use client';

interface Agent {
  id: string;
  name: string;
  role: string;
  emoji: string;
  color: string;
  status: string;
  currentTask: string | null;
}

interface SquadHUDProps {
  agents: Agent[];
}

export default function SquadHUD({ agents }: SquadHUDProps) {
  return (
    <div className="bg-deep border-r border-panel p-4 overflow-y-auto">
      <div className="text-[10px] text-nebula uppercase tracking-wider mb-3">
        Your Squad
      </div>

      {agents.length === 0 && (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg animate-pulse">
              <div className="w-8 h-8 rounded-full bg-panel" />
              <div className="flex-1">
                <div className="h-3 bg-panel rounded w-16 mb-1" />
                <div className="h-2 bg-panel rounded w-20" />
              </div>
            </div>
          ))}
        </div>
      )}

      {agents.map((agent) => (
        <div
          key={agent.id}
          className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-surface transition-colors group relative mb-1"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 relative ${
              agent.status === 'working' ? 'after:border-success' : 'after:border-nebula'
            } after:content-[\"\"] after:absolute after:inset-[-2px] after:rounded-full after:border-2 after:transition-colors`}
            style={{ backgroundColor: agent.color + '20' }}
          >
            {agent.emoji}
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold truncate">{agent.name}</div>
            <div className="text-[10px] text-nebula truncate">
              {agent.status === 'working'
                ? agent.currentTask || 'Working...'
                : agent.status === 'idle'
                ? 'On standby'
                : agent.status}
            </div>
          </div>

          <button className="opacity-0 group-hover:opacity-100 bg-aurora text-void text-[10px] font-semibold px-2 py-1 rounded-full transition-opacity">
            Ask
          </button>
        </div>
      ))}
    </div>
  );
}
