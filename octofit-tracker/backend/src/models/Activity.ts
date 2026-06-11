import { Schema, model, Document, Types } from 'mongoose';

interface IActivity extends Document {
  userId: Types.ObjectId;
  type: string;
  duration: number;
  calories: number;
  distance?: number;
  intensity: 'low' | 'medium' | 'high';
  date: Date;
  createdAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    distance: Number,
    intensity: { type: String, enum: ['low', 'medium', 'high'], required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Activity = model<IActivity>('Activity', activitySchema);
