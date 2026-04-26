'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AgentOrchestrator } from '../lib/demoOrchestrator';

interface DemoSocketContextType {
  socket: DemoSocket | null;
  connected: boolean;
}

class DemoSocket {
  private orchestrator: AgentOrchestrator | null = null;
  private projectId: string = '';
  private listeners: Map<string, Function[]> = new Map();

  on(event: string, handler: Function) {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event)!.push(handler);
  }

  off(event: string, handler?: Function) {
    const handlers = this.listeners.get(event);
    if (handlers) {
      if (handler) {
        this.listeners.set(event, handlers.filter((h) => h !== handler));
      } else {
        this.listeners.set(event, []);
      }
    }
  }

  emit(event: string, data: any) {
    if (event === 'start_project') {
      this.orchestrator = new AgentOrchestrator(this);
      const projectId = 'demo-' + Date.now();
      this.projectId = projectId;
      this.orchestrator.createProject(projectId, data);
      setTimeout(() => {
        this.trigger('project_created', {
          projectId,
          state: this.orchestrator!.getProjectState(projectId),
        });
      }, 100);
    }
    if (event === 'join_project') {
      this.projectId = data;
      if (this.orchestrator) {
        setTimeout(() => {
          this.trigger('project_state', this.orchestrator!.getProjectState(data));
        }, 100);
      }
    }
    if (event === 'user_message') {
      if (this.orchestrator) {
        this.orchestrator.handleUserMessage(data.projectId, data.text);
      }
    }
  }

  trigger(event: string, data: any) {
    const handlers = this.listeners.get(event);
    if (handlers) handlers.forEach((h) => h(data));
  }

  close() {}
}

const DemoSocketContext = createContext<DemoSocketContextType>({ socket: null, connected: false });

export function DemoSocketProvider({ children }: { children: ReactNode }) {
  const [socket] = useState(() => new DemoSocket());
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setConnected(true);
    return () => socket.close();
  }, [socket]);

  return (
    <DemoSocketContext.Provider value={{ socket, connected }}>
      {children}
    </DemoSocketContext.Provider>
  );
}

export function useDemoSocket() {
  return useContext(DemoSocketContext);
}
