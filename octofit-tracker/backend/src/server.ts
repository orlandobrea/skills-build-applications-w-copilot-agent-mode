import express from 'express';
import { connectDatabase } from './config/database';
import { User } from './models/User';
import { Team } from './models/Team';
import { Activity } from './models/Activity';
import { Leaderboard } from './models/Leaderboard';
import { Workout } from './models/Workout';

const app = express();
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit_db';
const PORT = Number(process.env.PORT || 8000);

// Codespaces-aware API URL
const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

app.get('/', (_req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'octofit-backend',
    apiUrl: getApiUrl()
  });
});

// Users routes
app.get('/api/users/', async (_req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

// Teams routes
app.get('/api/teams/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('leader').populate('members');
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

app.post('/api/teams/', async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create team' });
  }
});

// Activities routes
app.get('/api/activities/', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

app.post('/api/activities/', async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    res.status(400).json({ error: 'Failed to log activity' });
  }
});

// Leaderboard routes
app.get('/api/leaderboard/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('userId')
      .sort({ rank: 1 });
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Workouts routes
app.get('/api/workouts/', async (_req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

async function start() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      console.log(`API URL: ${getApiUrl()}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
