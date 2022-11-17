export interface MongooseWrokoutModelWrapper {
    find(): any
    findById(id: string): any
    create(workout: any): any
    findByIdAndUpdate(id: string, data: any, options?: any, callback?: any): any
    findByIdAndDelete(id: string): void
}