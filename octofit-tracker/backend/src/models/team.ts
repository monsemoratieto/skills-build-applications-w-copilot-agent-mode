import { model, Schema } from 'mongoose';

export interface TeamDocument {
  name: string;
  description: string;
  members: string[];
  createdAt: Date;
}

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() },
});

const Team = model<TeamDocument>('Team', teamSchema);
export default Team;
