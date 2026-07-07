import { model, Schema } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: () => new Date() },
});
const Team = model('Team', teamSchema);
export default Team;
