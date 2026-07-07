import mongoose from 'mongoose';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import Workout from '../models/workout.js';
import Leaderboard from '../models/leaderboard.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await mongoose.connection.db.dropDatabase();

    const users = await User.insertMany([
      { name: 'Ava Morgan', email: 'ava.morgan@example.com', role: 'leader' },
      { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'member' },
      { name: 'Mia Chen', email: 'mia.chen@example.com', role: 'member' },
    ]);

    const teams = await Team.insertMany([
      { name: 'Rising Octos', description: 'Focus on endurance and team challenges', members: [users[0]._id, users[1]._id] },
      { name: 'Aqua Sprint', description: 'High-intensity training and leaderboard climbing', members: [users[2]._id] },
    ]);

    await User.updateMany({ _id: { $in: teams[0].members } }, { team: teams[0]._id });
    await User.updateOne({ _id: users[2]._id }, { team: teams[1]._id });

    const activities = await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'Cycling',
        durationMinutes: 72,
        caloriesBurned: 620,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 28),
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        type: 'Running',
        durationMinutes: 40,
        caloriesBurned: 420,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 18),
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        type: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 480,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
      },
    ]);

    const workouts = await Workout.insertMany([
      {
        user: users[0]._id,
        title: 'Morning Interval Ride',
        difficulty: 'Intermediate',
        durationMinutes: 45,
        exercises: [
          { name: 'Warm-up', reps: 1, sets: 1 },
          { name: 'Hill intervals', reps: 5, sets: 1 },
          { name: 'Cool down', reps: 1, sets: 1 },
        ],
      },
      {
        user: users[1]._id,
        title: 'Core Strength Circuit',
        difficulty: 'Advanced',
        durationMinutes: 50,
        exercises: [
          { name: 'Plank holds', reps: 4, sets: 1 },
          { name: 'Medicine ball sit-ups', reps: 15, sets: 3 },
          { name: 'Russian twists', reps: 20, sets: 3 },
        ],
      },
      {
        user: users[2]._id,
        title: 'Recovery Yoga Flow',
        difficulty: 'Beginner',
        durationMinutes: 30,
        exercises: [
          { name: 'Sun salutations', reps: 8, sets: 1 },
          { name: 'Hip openers', reps: 6, sets: 1 },
          { name: 'Breathing practice', reps: 1, sets: 1 },
        ],
      },
    ]);

    await Leaderboard.insertMany([
      { team: teams[0]._id, totalPoints: 1840, rank: 1 },
      { team: teams[1]._id, totalPoints: 1460, rank: 2 },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log({ users: users.length, teams: teams.length, activities: activities.length, workouts: workouts.length });

    await mongoose.disconnect();
    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
