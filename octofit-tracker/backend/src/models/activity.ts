import { model, Schema } from 'mongoose';

export interface ActivityDocument {
  user: string;
  team: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  performedAt: Date;
}

const activitySchema = new Schema<ActivityDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  performedAt: { type: Date, default: () => new Date() },
});

const Activity = model<ActivityDocument>('Activity', activitySchema);
export default Activity;
