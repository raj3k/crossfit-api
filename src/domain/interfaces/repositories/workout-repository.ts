import { WorkoutRequestModel, WorkoutResponseModel } from "@/domain/models/workout";

export interface WorkoutRepository {
    createContact(contact: WorkoutRequestModel): void;
    deleteContact(id: String): void;
    updateContact(id: String, data: WorkoutRequestModel): void;
    getContacts(): Promise<WorkoutResponseModel[]>;
    getContact(id: String): Promise<WorkoutResponseModel | null>;
}