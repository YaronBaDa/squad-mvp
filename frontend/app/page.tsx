'use client';

import { useState } from 'react';
import { DemoSocketProvider } from '@/components/DemoSocketProvider';
import LandingPage from '@/components/LandingPage';
import Wizard from '@/components/Wizard';
import Dashboard from '@/components/Dashboard';
import Assembly from '@/components/Assembly';

type View = 'landing' | 'wizard' | 'assembly' | 'dashboard';

export default function Home() {
  const [view, setView] = useState<View>('landing');
  const [projectConfig, setProjectConfig] = useState<any>(null);
  const [projectId, setProjectId] = useState<string>('');

  const handleWizardComplete = (config: any) => {
    setProjectConfig(config);
    setView('assembly');
  };

  const handleAssemblyComplete = (id: string) => {
    setProjectId(id);
    setView('dashboard');
  };

  return (
    <DemoSocketProvider>
      <main className="min-h-screen bg-void text-starlight overflow-hidden">
        {view === 'landing' && <LandingPage onStart={() => setView('wizard')} />}
        {view === 'wizard' && <Wizard onComplete={handleWizardComplete} />}
        {view === 'assembly' && (
          <Assembly config={projectConfig} onComplete={handleAssemblyComplete} />
        )}
        {view === 'dashboard' && (
          <Dashboard projectId={projectId} />
        )}
      </main>
    </DemoSocketProvider>
  );
}
