import { model, Schema } from 'mongoose';
const leaderboardSchema = new Schema({
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    totalPoints: { type: Number, required: true },
    rank: { type: Number, required: true },
    updatedAt: { type: Date, default: () => new Date() },
});
const Leaderboard = model('Leaderboard', leaderboardSchema);
export default Leaderboard;
