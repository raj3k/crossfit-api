# crossfit-api
This is simple fictional application that allows users to view Crossfit workouts and save record for given workout.

Goals for this project:
- Attempt to create Clean Architecture based application in Typescript
- use REST API Design Best Practices
- Learn Typescript

### Main Entities
1. User
2. Workout
3. Record

### Use-cases
* User -> Crossfit API
  * User can create account in application
* User -> Workout
  * Users can get all workouts list
* User -> Record
  * User can create own Record
  * User can edit own Record
  * User can delete own Record
  
### ToDo
- [ ] Add Record resource
- [ ] Group associated Wordkout and Record resources together (logical nesting)
- [ ] Add Roles for User: Coach and Member
- [ ] Integrate filtering, sorting & pagination
- [ ] Use data caching for performance improvements
- [ ] Document API properly
- [ ] Add Instruction how to run application
