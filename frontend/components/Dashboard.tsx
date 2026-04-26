'use client';

import { useEffect, useState, useRef } from 'react';
import { useDemoSocket } from './DemoSocketProvider';
import SquadHUD from './SquadHUD';
import ProductMap from './ProductMap';
import ActivityStream from './ActivityStream';
import SummonBar from './SummonBar';

interface Agent {
  id: string;
  name: string;
  role: string;
  emoji: string;
  color: string;
  status: string;
  currentTask: string | null;
}

interface Task {
  id: string;
  title: string;
  status: string;
  agent: string;
  progress: number;
}

interface Activity {
  id: string;
  agentId: string;
  agentEmoji: string;
  message: string;
  timestamp: number;
}

interface MapNode {
  id: string;
  title: string;
  status: string;
  agent: string;
  agentEmoji: string;
  progress: number;
  level: number;
}

interface DashboardProps {
  projectId: string;
}

export default function Dashboard({ projectId }: DashboardProps) {
  const { socket } = useDemoSocket();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [mapNodes, setMapNodes] = useState<MapNode[]>([]);
  const [projectStatus, setProjectStatus] = useState('assembling');
  const [missionName, setMissionName] = useState('New Project');

  useEffect(() => {
    if (!socket) return;

    socket.emit('join_project', projectId);

    socket.on('project_state', (state: any) => {
      setAgents(state.agents);
      setTasks(state.tasks);
      setActivities(state.messages);
      setMapNodes(state.mapNodes);
      setProjectStatus(state.status);
    });

    socket.on('agent_status', ({ agentId, status, task }: any) => {
      setAgents((prev) =>
        prev.map((a) =>
          a.id === agentId ? { ...a, status, currentTask: task } : a
        )
      );
    });

    socket.on('task_complete', ({ taskId }: any) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: 'completed', progress: 100 } : t))
      );
    });

    socket.on('task_progress', ({ taskId, progress }: any) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, progress } : t))
      );
    });

    socket.on('map_update', ({ nodes }: any) => {
      setMapNodes(nodes);
    });

    socket.on('activity', (activity: any) => {
      setActivities((prev) => [activity, ...prev].slice(0, 50));
    });

    socket.on('project_status', ({ status }: any) => {
      setProjectStatus(status);
    });

    return () => {
      socket.off('project_state');
      socket.off('agent_status');
      socket.off('task_complete');
      socket.off('task_progress');
      socket.off('map_update');
      socket.off('activity');
      socket.off('project_status');
    };
  }, [socket, projectId]);

  const handleSendMessage = (text: string) => {
    if (!socket) return;
    socket.emit('user_message', { projectId, text });
  };

  return (
    <div className="h-[100dvh] flex flex-col">
      {/* Top Nav */}
      <header className="h-14 bg-deep border-b border-panel flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg tracking-tight">SQUAD</span>
          <div className="w-px h-4 bg-panel" />
          <span className="text-xs text-nebula truncate max-w-[200px]">
            Mission: {missionName}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-nebula">Free Plan</span>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aurora to-pulse flex items-center justify-center text-void text-xs font-bold">
            Y
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-[220px_1fr_260px] overflow-hidden">
        {/* Squad HUD */}
        <SquadHUD agents={agents} />

        {/* Product Map */}
        <ProductMap nodes={mapNodes} />

        {/* Activity Stream */}
        <ActivityStream activities={activities} />
      </div>

      {/* Summon Bar */}
      <SummonBar onSend={handleSendMessage} />
    </div>
  );
}
