import mongoose from 'mongoose';

export interface WorkoutRequestModel {
    name: string;
    mode: string;
    equipment: string[];
    exercises: string[];
    trainerTips: string[];
}

export interface WorkoutResponseModel {
    _id: string;
    name: string;
    mode: string;
    equipment: string[];
    exercises: string[];
    trainerTips: string[];
    createdAt: string;
    updatedAt: string;
}

const workoutSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        mode: { type: String, required: true },
        equipment: { type: [String], required: true },
        exercises: { type: [String], required: true },
        trainerTips: { type: [String] }      
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const WorkoutModel = mongoose.model<WorkoutResponseModel>('Workout', workoutSchema);