'use client';

import { useRef, useEffect } from 'react';

interface Activity {
  id: string;
  agentId: string;
  agentEmoji: string;
  message: string;
  timestamp: number;
}

interface ActivityStreamProps {
  activities: Activity[];
}

export default function ActivityStream({ activities }: ActivityStreamProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activities]);

  const formatTime = (ts: number) => {
    const diff = Date.now() - ts;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    return `${Math.floor(diff / 3600000)}h ago`;
  };

  return (
    <div className="bg-deep border-l border-panel p-4 overflow-y-auto">
      <div className="text-[10px] text-nebula uppercase tracking-wider mb-3">
        Activity Stream
      </div>

      <div ref={scrollRef} className="space-y-3">
        {activities.length === 0 && (
          <div className="text-xs text-nebula">Waiting for updates...</div>
        )}

        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-3 animate-slide-up"
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${
                activity.agentId === 'user'
                  ? 'bg-aurora text-void'
                  : 'bg-surface'
              }`}
            >
              {activity.agentId === 'user' ? '💬' : activity.agentEmoji}
            </div>
            <div className="min-w-0">
              <div
                className="text-xs leading-relaxed text-lunar"
                dangerouslySetInnerHTML={{ __html: activity.message }}
              />
              <div className="text-[10px] text-nebula mt-0.5 font-mono">
                {formatTime(activity.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
