import { model, Schema, Types } from 'mongoose';

export interface LeaderboardDocument {
  team: Types.ObjectId;
  totalPoints: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<LeaderboardDocument>({
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  totalPoints: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() },
});

const Leaderboard = model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
export default Leaderboard;
