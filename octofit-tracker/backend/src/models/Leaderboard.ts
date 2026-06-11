import { Schema, model, Document, Types } from 'mongoose';

interface ILeaderboard extends Document {
  userId: Types.ObjectId;
  score: number;
  rank: number;
  totalActivities: number;
  totalCalories: number;
  totalDistance: number;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
    totalActivities: { type: Number, default: 0 },
    totalCalories: { type: Number, default: 0 },
    totalDistance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Leaderboard = model<ILeaderboard>('Leaderboard', leaderboardSchema);
