import { model, Schema } from 'mongoose';
const workoutSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    exercises: [
        {
            name: { type: String, required: true },
            reps: { type: Number, required: true },
            sets: { type: Number, required: true },
        },
    ],
    createdAt: { type: Date, default: () => new Date() },
});
const Workout = model('Workout', workoutSchema);
export default Workout;
