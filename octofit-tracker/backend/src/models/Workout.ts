import { Schema, model, Document } from 'mongoose';

interface IWorkout extends Document {
  name: string;
  description: string;
  type: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: string[];
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true },
    description: String,
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    exercises: [String],
  },
  { timestamps: true }
);

export const Workout = model<IWorkout>('Workout', workoutSchema);
