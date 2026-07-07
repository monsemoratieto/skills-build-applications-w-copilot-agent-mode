import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
const app = express();
const PORT = Number(process.env.PORT) || 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const apiBaseUrl = CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
app.use(cors());
app.use(express.json());
app.get('/', (_, res) => {
    res.json({
        status: 'OctoFit Tracker backend is running',
        port: PORT,
        apiBaseUrl,
        codespace: CODESPACE_NAME || null,
    });
});
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend listening on ${apiBaseUrl}`);
});
