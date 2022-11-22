export interface MongooseModelWrapper {
    find(): any
    findById(id: string): any
    findOne(conditions: Object, projection?: any, options?: Object, callback?: Function): any
    create(data: any): any
    findByIdAndUpdate(id: string, data: any, options?: any, callback?: any): any
    findByIdAndDelete(id: string): void
}