const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { AgentOrchestrator } = require('./agents');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const orchestrator = new AgentOrchestrator(io);

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// Create project endpoint (REST fallback)
app.post('/api/projects', (req, res) => {
  const projectId = uuidv4();
  const project = orchestrator.createProject(projectId, req.body);
  res.json({ projectId, status: 'created' });
});

// Get project state
app.get('/api/projects/:id', (req, res) => {
  const state = orchestrator.getProjectState(req.params.id);
  if (!state) return res.status(404).json({ error: 'Project not found' });
  res.json(state);
});

// WebSocket connections
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join_project', (projectId) => {
    socket.join(projectId);
    const state = orchestrator.getProjectState(projectId);
    if (state) {
      socket.emit('project_state', state);
    }
  });

  socket.on('start_project', (config) => {
    const projectId = uuidv4();
    socket.join(projectId);
    const project = orchestrator.createProject(projectId, config);
    socket.emit('project_created', { projectId, state: orchestrator.getProjectState(projectId) });
  });

  socket.on('user_message', ({ projectId, text }) => {
    orchestrator.handleUserMessage(projectId, text);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 SQUAD Backend running on port ${PORT}`);
});
