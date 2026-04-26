'use client';

interface MapNode {
  id: string;
  title: string;
  status: string;
  agent: string;
  agentEmoji: string;
  progress: number;
  level: number;
}

interface ProductMapProps {
  nodes: MapNode[];
}

export default function ProductMap({ nodes }: ProductMapProps) {
  // Group nodes by level
  const levels: MapNode[][] = [];
  nodes.forEach((node) => {
    if (!levels[node.level]) levels[node.level] = [];
    levels[node.level].push(node);
  });

  return (
    <div className="bg-void flex items-center justify-center relative overflow-hidden">
      <div className="flex flex-col items-center gap-5 p-8 overflow-y-auto max-h-full">
        {levels.map((levelNodes, levelIdx) => (
          <div key={levelIdx} className="flex flex-col items-center">
            {/* Connector */}
            {levelIdx > 0 && (
              <div
                className="w-[2px] h-6 mb-5"
                style={{
                  background: 'linear-gradient(to bottom, #38BDF8, #64748B)',
                  opacity: 0.4,
                }}
              />
            )}

            {/* Node row */}
            <div className="flex flex-wrap justify-center gap-4">
              {levelNodes.map((node, i) => (
                <div
                  key={node.id}
                  className={`relative bg-surface border-2 rounded-xl p-4 min-w-[180px] transition-all animate-pop ${
                    node.status === 'completed'
                      ? 'border-l-4 border-l-success border-panel'
                      : node.status === 'building'
                      ? 'border-aurora animate-pulse-glow'
                      : 'border-panel'
                  }`}
                  style={{ animationDelay: `${levelIdx * 0.2 + i * 0.1}s` }}
                >
                  <div className="text-sm font-semibold mb-1">{node.title}</div>
                  <div className="flex items-center gap-2 text-[11px] text-nebula">
                    <span>{node.agentEmoji}</span>
                    <span>{node.agent}</span>
                    <span>·</span>
                    <span className="capitalize">{node.status}</span>
                  </div>

                  {/* Progress bar */}
                  {node.status === 'building' && (
                    <div className="mt-2 h-1 bg-panel rounded overflow-hidden">
                      <div
                        className="h-full bg-aurora transition-all duration-500"
                        style={{ width: `${node.progress}%` }}
                      />
                    </div>
                  )}

                  {node.status === 'completed' && (
                    <div className="absolute top-3 right-3 text-success text-sm">
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {nodes.length === 0 && (
          <div className="text-nebula text-sm">Loading your product map...</div>
        )}
      </div>
    </div>
  );
}
