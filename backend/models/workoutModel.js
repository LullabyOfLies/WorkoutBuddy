const mongoose = require('mongoose')

//Schema is a set of rules that's enforced to make sure that the data within the database is appropriate. Defines the structure of a document inside a database

//Model applies a Schema to a Model and use a Model to interact with a collect of a name.

//Models makes sure that there are no unnecessary data stored in the database

const Schema = mongoose.Schema

const workoutSchema = new Schema({
       title: {
              type: String,
              require: true
       },
       reps: {
              type: Number, 
              require: true
       },
       load :{
              type: Number,
              require: true
       },
       user_id: {
              type: String,
              require: true
       }

}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)
