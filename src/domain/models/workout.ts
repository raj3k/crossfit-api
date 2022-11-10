export interface WorkoutRequestModel {
    name: string;
    mode: string;
    equipment: string[];
    exercises: string[];
    trainerTips: string[];
}

export interface WorkoutResponseModel {
    id: string;
    name: string;
    mode: string;
    equipment: string[];
    exercises: string[];
    trainerTips: string[];
    createdAt: string;
    updatedAt: string;
}