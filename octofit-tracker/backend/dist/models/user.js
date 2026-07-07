import { model, Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    createdAt: { type: Date, default: () => new Date() },
});
const User = model('User', userSchema);
export default User;
