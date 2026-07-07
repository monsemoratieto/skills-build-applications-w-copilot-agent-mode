import { model, Schema } from 'mongoose';

export interface UserDocument {
  name: string;
  email: string;
  role: string;
  team?: string;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  createdAt: { type: Date, default: () => new Date() },
});

const User = model<UserDocument>('User', userSchema);
export default User;
