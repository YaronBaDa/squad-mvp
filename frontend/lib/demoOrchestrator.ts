const AGENTS: Record<string, any> = {
  pm: { id: 'pm', name: 'Alex', role: 'The Captain', emoji: '🛡️', color: '#38BDF8', status: 'idle', currentTask: null },
  designer: { id: 'designer', name: 'Maya', role: 'The Architect', emoji: '🎨', color: '#A78BFA', status: 'idle', currentTask: null },
  coder: { id: 'coder', name: 'Jordan', role: 'The Builder', emoji: '💻', color: '#34D399', status: 'idle', currentTask: null },
  qa: { id: 'qa', name: 'Sam', role: 'The Gatekeeper', emoji: '🔐', color: '#F87171', status: 'idle', currentTask: null },
  planner: { id: 'planner', name: 'Taylor', role: 'The Cartographer', emoji: '🗺️', color: '#FBBF24', status: 'idle', currentTask: null },
  devops: { id: 'devops', name: 'Riley', role: 'The Pilot', emoji: '🚀', color: '#F472B6', status: 'idle', currentTask: null },
  marketing: { id: 'marketing', name: 'Casey', role: 'The Voice', emoji: '📢', color: '#FB923C', status: 'idle', currentTask: null },
  growth: { id: 'growth', name: 'Quinn', role: 'The Scout', emoji: '📊', color: '#2DD4BF', status: 'idle', currentTask: null },
};

const PATH_TEMPLATES: Record<string, any[]> = {
  marketplace: [
    { id: 't1', title: 'Mission Brief', agent: 'pm', duration: 2000, dependsOn: [] },
    { id: 't2', title: 'User Research', agent: 'designer', duration: 4000, dependsOn: ['t1'] },
    { id: 't3', title: 'Market Analysis', agent: 'growth', duration: 3000, dependsOn: ['t1'] },
    { id: 't4', title: 'Database Schema', agent: 'coder', duration: 5000, dependsOn: ['t2'] },
    { id: 't5', title: 'Authentication', agent: 'coder', duration: 4000, dependsOn: ['t4'] },
    { id: 't6', title: 'User Profiles', agent: 'coder', duration: 3500, dependsOn: ['t5'] },
    { id: 't7', title: 'Matching Algorithm', agent: 'coder', duration: 6000, dependsOn: ['t6'] },
    { id: 't8', title: 'Payment Flow', agent: 'coder', duration: 5000, dependsOn: ['t5'] },
    { id: 't9', title: 'UI Design System', agent: 'designer', duration: 4000, dependsOn: ['t2'] },
    { id: 't10', title: 'Landing Page', agent: 'designer', duration: 3000, dependsOn: ['t9'] },
    { id: 't11', title: 'QA Testing', agent: 'qa', duration: 4000, dependsOn: ['t7', 't8', 't10'] },
    { id: 't12', title: 'Deployment', agent: 'devops', duration: 3000, dependsOn: ['t11'] },
    { id: 't13', title: 'Launch Copy', agent: 'marketing', duration: 2000, dependsOn: ['t10'] },
    { id: 't14', title: 'Analytics Setup', agent: 'growth', duration: 2000, dependsOn: ['t12'] },
  ],
  saas: [
    { id: 't1', title: 'Mission Brief', agent: 'pm', duration: 2000, dependsOn: [] },
    { id: 't2', title: 'Competitor Analysis', agent: 'growth', duration: 3000, dependsOn: ['t1'] },
    { id: 't3', title: 'UX Research', agent: 'designer', duration: 4000, dependsOn: ['t1'] },
    { id: 't4', title: 'Core API Design', agent: 'coder', duration: 5000, dependsOn: ['t2'] },
    { id: 't5', title: 'Database Layer', agent: 'coder', duration: 4000, dependsOn: ['t4'] },
    { id: 't6', title: 'Auth & Teams', agent: 'coder', duration: 4500, dependsOn: ['t5'] },
    { id: 't7', title: 'Dashboard UI', agent: 'designer', duration: 4000, dependsOn: ['t3'] },
    { id: 't8', title: 'Core Features', agent: 'coder', duration: 6000, dependsOn: ['t6', 't7'] },
    { id: 't9', title: 'Settings Panel', agent: 'coder', duration: 3000, dependsOn: ['t8'] },
    { id: 't10', title: 'Integrations', agent: 'coder', duration: 4000, dependsOn: ['t8'] },
    { id: 't11', title: 'Security Audit', agent: 'qa', duration: 3500, dependsOn: ['t9', 't10'] },
    { id: 't12', title: 'Beta Deploy', agent: 'devops', duration: 3000, dependsOn: ['t11'] },
    { id: 't13', title: 'Pricing Page', agent: 'marketing', duration: 2500, dependsOn: ['t7'] },
    { id: 't14', title: 'Onboarding Flow', agent: 'designer', duration: 3000, dependsOn: ['t12'] },
  ],
  community: [
    { id: 't1', title: 'Mission Brief', agent: 'pm', duration: 2000, dependsOn: [] },
    { id: 't2', title: 'Community Research', agent: 'designer', duration: 3500, dependsOn: ['t1'] },
    { id: 't3', title: 'Content Strategy', agent: 'marketing', duration: 3000, dependsOn: ['t1'] },
    { id: 't4', title: 'User System', agent: 'coder', duration: 4000, dependsOn: ['t2'] },
    { id: 't5', title: 'Feed Algorithm', agent: 'coder', duration: 5000, dependsOn: ['t4'] },
    { id: 't6', title: 'Messaging', agent: 'coder', duration: 4500, dependsOn: ['t4'] },
    { id: 't7', title: 'Moderation Tools', agent: 'coder', duration: 4000, dependsOn: ['t5'] },
    { id: 't8', title: 'Community Design', agent: 'designer', duration: 4000, dependsOn: ['t2'] },
    { id: 't9', title: 'Notification System', agent: 'coder', duration: 3000, dependsOn: ['t6'] },
    { id: 't10', title: 'Mobile Responsive', agent: 'designer', duration: 3000, dependsOn: ['t8'] },
    { id: 't11', title: 'QA & Testing', agent: 'qa', duration: 3500, dependsOn: ['t7', 't9', 't10'] },
    { id: 't12', title: 'Deploy', agent: 'devops', duration: 2500, dependsOn: ['t11'] },
  ],
  d2c: [
    { id: 't1', title: 'Mission Brief', agent: 'pm', duration: 2000, dependsOn: [] },
    { id: 't2', title: 'Brand Research', agent: 'designer', duration: 3000, dependsOn: ['t1'] },
    { id: 't3', title: 'Storefront UX', agent: 'designer', duration: 4000, dependsOn: ['t2'] },
    { id: 't4', title: 'Product Catalog', agent: 'coder', duration: 4000, dependsOn: ['t3'] },
    { id: 't5', title: 'Shopping Cart', agent: 'coder', duration: 3500, dependsOn: ['t4'] },
    { id: 't6', title: 'Checkout Flow', agent: 'coder', duration: 5000, dependsOn: ['t5'] },
    { id: 't7', title: 'Payment Gateway', agent: 'coder', duration: 4000, dependsOn: ['t6'] },
    { id: 't8', title: 'Order Management', agent: 'coder', duration: 3500, dependsOn: ['t7'] },
    { id: 't9', title: 'Brand Assets', agent: 'designer', duration: 3000, dependsOn: ['t3'] },
    { id: 't10', title: 'Product Copy', agent: 'marketing', duration: 2500, dependsOn: ['t4'] },
    { id: 't11', title: 'SEO Setup', agent: 'growth', duration: 2000, dependsOn: ['t10'] },
    { id: 't12', title: 'Testing', agent: 'qa', duration: 3000, dependsOn: ['t8', 't9'] },
    { id: 't13', title: 'Launch', agent: 'devops', duration: 2500, dependsOn: ['t12'] },
  ],
};

const TRANSLATIONS: Record<string, string> = {
  'Mission Brief': 'Mapping your mission into key milestones',
  'User Research': 'Understanding who will love your product',
  'Market Analysis': 'Checking the competitive landscape',
  'Database Schema': 'Building the foundation for your data',
  'Authentication': 'Creating secure access for your users',
  'User Profiles': 'Setting up how people represent themselves',
  'Matching Algorithm': 'Building the engine that connects people',
  'Payment Flow': 'Enabling transactions safely',
  'UI Design System': 'Creating your visual language',
  'Landing Page': 'Crafting your first impression',
  'QA Testing': 'Making sure everything works perfectly',
  'Deployment': 'Going live to the world',
  'Launch Copy': 'Writing words that convert',
  'Analytics Setup': 'Installing your growth dashboard',
  'Competitor Analysis': 'Learning from others in your space',
  'Core API Design': 'Designing how features talk to each other',
  'Database Layer': 'Storing information securely',
  'Auth & Teams': 'Building login and team features',
  'Dashboard UI': 'Creating your command center',
  'Core Features': 'Building what makes your product special',
  'Settings Panel': 'Giving users control',
  'Integrations': 'Connecting with other tools',
  'Security Audit': 'Checking for vulnerabilities',
  'Beta Deploy': 'Releasing to early testers',
  'Pricing Page': 'Setting up how you get paid',
  'Onboarding Flow': 'Guiding first-time users',
  'Community Research': 'Understanding your future members',
  'Content Strategy': 'Planning what to share',
  'User System': 'Building membership features',
  'Feed Algorithm': 'Deciding what people see first',
  'Messaging': 'Enabling private conversations',
  'Moderation Tools': 'Keeping the community safe',
  'Community Design': 'Creating spaces for connection',
  'Notification System': 'Keeping people engaged',
  'Mobile Responsive': 'Making it work on every device',
  'Brand Research': 'Discovering your unique voice',
  'Storefront UX': 'Designing the shopping experience',
  'Product Catalog': 'Organizing what you sell',
  'Shopping Cart': 'Building the basket experience',
  'Checkout Flow': 'Making buying seamless',
  'Payment Gateway': 'Processing transactions securely',
  'Order Management': 'Tracking purchases end-to-end',
  'Brand Assets': 'Creating your visual identity',
  'Product Copy': 'Writing descriptions that sell',
  'SEO Setup': 'Making you findable on Google',
};

export class AgentOrchestrator {
  private socket: any;
  private projects: Map<string, any> = new Map();
  private activeTimers: Map<string, any> = new Map();

  constructor(socket: any) {
    this.socket = socket;
  }

  createProject(projectId: string, config: any) {
    const path = config.path === 'I have an idea' ? 'saas' :
                 config.path === 'I have notes' ? 'marketplace' :
                 config.path === 'Running business' ? 'saas' :
                 config.path === 'Experiment' ? 'community' : 'saas';
    
    const template = PATH_TEMPLATES[path] || PATH_TEMPLATES.saas;
    const tasks = template.map((t: any) => ({
      ...t,
      status: 'pending',
      startedAt: null,
      completedAt: null,
      progress: 0,
    }));

    const project = {
      id: projectId,
      config,
      tasks,
      agents: JSON.parse(JSON.stringify(AGENTS)),
      messages: [],
      mapNodes: [],
      createdAt: Date.now(),
      status: 'assembling',
    };

    this.projects.set(projectId, project);
    this.startProject(projectId);
    return project;
  }

  startProject(projectId: string) {
    const project = this.projects.get(projectId);
    if (!project) return;

    setTimeout(() => {
      project.status = 'active';
      this.broadcast(projectId, 'project_status', { status: 'active' });
      this.processQueue(projectId);
    }, 3000);
  }

  processQueue(projectId: string) {
    const project = this.projects.get(projectId);
    if (!project || project.status !== 'active') return;

    const readyTasks = project.tasks.filter((t: any) => {
      if (t.status !== 'pending') return false;
      return t.dependsOn.every((depId: string) => {
        const dep = project.tasks.find((dt: any) => dt.id === depId);
        return dep && dep.status === 'completed';
      });
    });

    readyTasks.forEach((task: any) => {
      this.startTask(projectId, task);
    });

    const allDone = project.tasks.every((t: any) => t.status === 'completed');
    if (allDone) {
      project.status = 'completed';
      this.broadcast(projectId, 'project_status', { status: 'completed' });
      this.addActivity(projectId, 'pm', `Mission complete! Your product is ready to launch. 🚀`);
    }
  }

  startTask(projectId: string, task: any) {
    const project = this.projects.get(projectId);
    if (!project) return;

    task.status = 'building';
    task.startedAt = Date.now();

    const agent = project.agents[task.agent];
    agent.status = 'working';
    agent.currentTask = task.title;

    const founderMessage = TRANSLATIONS[task.title] || `${agent.name} is working on ${task.title}`;

    this.broadcast(projectId, 'agent_status', {
      agentId: task.agent,
      status: 'working',
      task: task.title,
      message: founderMessage,
    });

    this.addActivity(projectId, task.agent, `${agent.name} started: ${founderMessage}`);
    this.broadcastMapUpdate(projectId);

    const progressInterval = setInterval(() => {
      task.progress = Math.min(task.progress + 10, 90);
      this.broadcast(projectId, 'task_progress', {
        taskId: task.id,
        progress: task.progress,
      });
    }, task.duration / 10);

    setTimeout(() => {
      clearInterval(progressInterval);
      task.status = 'completed';
      task.progress = 100;
      task.completedAt = Date.now();

      agent.status = 'idle';
      agent.currentTask = null;

      this.broadcast(projectId, 'task_complete', {
        taskId: task.id,
        task: task.title,
        agent: task.agent,
      });

      this.addActivity(projectId, task.agent, `${agent.name} completed: ${task.title} ✓`);
      this.broadcastMapUpdate(projectId);

      setTimeout(() => this.processQueue(projectId), 500);
    }, task.duration);
  }

  broadcast(projectId: string, event: string, data: any) {
    this.socket.trigger(event, data);
  }

  broadcastMapUpdate(projectId: string) {
    const project = this.projects.get(projectId);
    if (!project) return;

    const nodes = project.tasks.map((t: any) => ({
      id: t.id,
      title: t.title,
      status: t.status,
      agent: project.agents[t.agent].name,
      agentEmoji: project.agents[t.agent].emoji,
      progress: t.progress,
      level: this.getNodeLevel(project.tasks, t),
    }));

    this.broadcast(projectId, 'map_update', { nodes });
  }

  getNodeLevel(allTasks: any[], task: any): number {
    if (task.dependsOn.length === 0) return 0;
    const parentLevels = task.dependsOn.map((depId: string) => {
      const parent = allTasks.find((t: any) => t.id === depId);
      return parent ? this.getNodeLevel(allTasks, parent) + 1 : 0;
    });
    return Math.max(...parentLevels);
  }

  addActivity(projectId: string, agentId: string, message: string) {
    const project = this.projects.get(projectId);
    if (!project) return;

    const activity = {
      id: 'act-' + Date.now() + Math.random(),
      agentId,
      agentEmoji: project.agents[agentId]?.emoji || '🔹',
      message,
      timestamp: Date.now(),
    };

    project.messages.unshift(activity);
    if (project.messages.length > 50) project.messages.pop();

    this.broadcast(projectId, 'activity', activity);
  }

  handleUserMessage(projectId: string, text: string) {
    const project = this.projects.get(projectId);
    if (!project) return;

    this.addActivity(projectId, 'user', `You: "${text}"`);

    setTimeout(() => {
      const responses = [
        "Your Squad is building the foundation. Next up: user authentication and the main dashboard.",
        "Looking good! The database schema is solid. Want me to prioritize mobile responsiveness?",
        "We're on track. The core features should be ready for QA by tomorrow.",
        "I've assigned Jordan to speed up the API development. Everything else stays on schedule.",
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      this.addActivity(projectId, 'pm', `Alex: ${response}`);
    }, 800);
  }

  getProjectState(projectId: string) {
    const project = this.projects.get(projectId);
    if (!project) return null;

    return {
      id: project.id,
      status: project.status,
      config: project.config,
      agents: Object.values(project.agents),
      tasks: project.tasks,
      messages: project.messages,
      mapNodes: project.tasks.map((t: any) => ({
        id: t.id,
        title: t.title,
        status: t.status,
        agent: project.agents[t.agent].name,
        agentEmoji: project.agents[t.agent].emoji,
        progress: t.progress,
        level: this.getNodeLevel(project.tasks, t),
      })),
    };
  }
}