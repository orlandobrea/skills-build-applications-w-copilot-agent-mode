import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

/**
 * Seed the octofit_db database with test data
 * This script populates all collections with realistic sample data
 */

const MONGO_URL = 'mongodb://127.0.0.1:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB:', MONGO_URL);
    console.log('\nSeeding the octofit_db database with test data...\n');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('✓ Cleared existing collections');

    // Create users
    const users = await User.insertMany([
      {
        username: 'alice_runner',
        email: 'alice@octofit.com',
        password: 'hashedpassword1',
        profile: {
          firstName: 'Alice',
          lastName: 'Runner',
          avatar: 'https://api.example.com/avatars/alice.png',
        },
      },
      {
        username: 'bob_cyclist',
        email: 'bob@octofit.com',
        password: 'hashedpassword2',
        profile: {
          firstName: 'Bob',
          lastName: 'Cyclist',
          avatar: 'https://api.example.com/avatars/bob.png',
        },
      },
      {
        username: 'charlie_swimmer',
        email: 'charlie@octofit.com',
        password: 'hashedpassword3',
        profile: {
          firstName: 'Charlie',
          lastName: 'Swimmer',
          avatar: 'https://api.example.com/avatars/charlie.png',
        },
      },
      {
        username: 'diana_lifter',
        email: 'diana@octofit.com',
        password: 'hashedpassword4',
        profile: {
          firstName: 'Diana',
          lastName: 'Lifter',
          avatar: 'https://api.example.com/avatars/diana.png',
        },
      },
    ]);
    console.log(`✓ Created ${users.length} users`);

    // Create teams
    const teams = await Team.insertMany([
      {
        name: 'Morning Runners',
        description: 'A team dedicated to early morning running',
        leader: users[0]._id,
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Fitness Squad',
        description: 'All-around fitness enthusiasts',
        leader: users[3]._id,
        members: [users[2]._id, users[3]._id],
      },
    ]);
    console.log(`✓ Created ${teams.length} teams`);

    // Create activities
    const now = new Date();
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Running',
        duration: 45,
        calories: 450,
        distance: 5.2,
        intensity: 'high',
        date: new Date(now.getTime() - 86400000),
      },
      {
        userId: users[0]._id,
        type: 'Running',
        duration: 30,
        calories: 300,
        distance: 3.5,
        intensity: 'medium',
        date: now,
      },
      {
        userId: users[1]._id,
        type: 'Cycling',
        duration: 60,
        calories: 500,
        distance: 15.8,
        intensity: 'medium',
        date: new Date(now.getTime() - 172800000),
      },
      {
        userId: users[2]._id,
        type: 'Swimming',
        duration: 40,
        calories: 400,
        distance: 2.0,
        intensity: 'high',
        date: now,
      },
      {
        userId: users[3]._id,
        type: 'Weight Training',
        duration: 55,
        calories: 350,
        intensity: 'high',
        date: new Date(now.getTime() - 259200000),
      },
    ]);
    console.log(`✓ Created ${activities.length} activities`);

    // Create leaderboard entries
    const leaderboard = await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        score: 950,
        rank: 1,
        totalActivities: 2,
        totalCalories: 750,
        totalDistance: 8.7,
      },
      {
        userId: users[1]._id,
        score: 850,
        rank: 2,
        totalActivities: 1,
        totalCalories: 500,
        totalDistance: 15.8,
      },
      {
        userId: users[2]._id,
        score: 800,
        rank: 3,
        totalActivities: 1,
        totalCalories: 400,
        totalDistance: 2.0,
      },
      {
        userId: users[3]._id,
        score: 700,
        rank: 4,
        totalActivities: 1,
        totalCalories: 350,
        totalDistance: 0,
      },
    ]);
    console.log(`✓ Created ${leaderboard.length} leaderboard entries`);

    // Create workouts
    const workouts = await Workout.insertMany([
      {
        name: 'Morning Jog',
        description: 'Easy-paced morning run for beginners',
        type: 'Cardio',
        duration: 30,
        difficulty: 'beginner',
        exercises: ['Warm-up walk', 'Jogging', 'Cool-down stretch'],
      },
      {
        name: 'HIIT Sprint',
        description: 'High-intensity interval training',
        type: 'Cardio',
        duration: 20,
        difficulty: 'advanced',
        exercises: ['Sprints', 'Recovery jogs', 'Cool-down'],
      },
      {
        name: 'Full Body Strength',
        description: 'Complete strength training routine',
        type: 'Strength',
        duration: 60,
        difficulty: 'intermediate',
        exercises: ['Squats', 'Bench press', 'Deadlifts', 'Pull-ups', 'Rows'],
      },
      {
        name: 'Yoga Flow',
        description: 'Relaxing yoga session for flexibility',
        type: 'Flexibility',
        duration: 45,
        difficulty: 'beginner',
        exercises: ['Sun salutations', 'Standing poses', 'Seated stretches', 'Meditation'],
      },
    ]);
    console.log(`✓ Created ${workouts.length} workouts`);

    console.log('\n✅ Database seeding completed successfully!\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();
