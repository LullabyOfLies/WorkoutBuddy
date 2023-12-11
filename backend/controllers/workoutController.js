const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async (req, res) =>{
       const user_id = req.user._id
       const workouts = await Workout.find({user_id}).sort({createdAt: -1})
       res.status(200).json(workouts)
      
}

//get a single workout
const getWorkout = async (req, res) =>{

       //id by using the request propery called "params"
       const {id} = req.params

       //check if the id is a valid Id in the mongoDb standards
       if(!mongoose.Types.ObjectId.isValid(id)){
              return res.status(404).json({error: 'No such workout'})
       }

       //if id is valid, find the document that have the id and pass the document to the workout constant
       const workout = await Workout.findById(id);

       //if workout is not true or the document is not in the db, it will logout 'No such Workou';
       if(!workout){
              return res.statu(404).json({error: 'No such Workout'})
       }

       //if workout is true, return or console log the status of the request (200) meaning it's working and output the document

       res.status(200).json(workout)
}

//create new workout
const createWorkout = async (req, res) =>{
       const {title, load, reps} = req.body
       
       let emptyFields = [];

       if(!title){
              emptyFields.push('title')
       }

       if(!load){
              emptyFields.push('load')
       }

       if(!reps){
              emptyFields.push('reps')
       }

       if(emptyFields.length > 0){
              return res.status(400).json({error: 'Please fill in all the required fields', emptyFields});
       }

       //add doc to db
       try{
              const user_id = req.user._id
              const workout = await Workout.create({title, load, reps, user_id})
       }catch(error){
              res.status(400).json({error: error.message})
             
       }
}


//delete a workout
const deleteWorkout = async (req, res)=>{
       const {id} = req.params

       if(!mongoose.Types.ObjectId.isValid(id)){
              return res.status(404).json({error: 'No such workout'})
       }

       //the parameter of the .findOneAndDelete called `_id:` is a field from the MongoDB itself meaning it's a constant in the Database for Ids, while the `id` is the input of the user.
       const workout = await Workout.findOneAndDelete({_id: id});

       if(!workout){
              return res.status(400).json({error: 'No such Workout'})
       }

       res.status(200).json(workout)
}


//update a workout
const updateWorkout = async (req,res)=>{
       const {id} = req.params

       if(!mongoose.Types.ObjectId.isValid(id)){
              return res.status(404).json({error: 'No such workout'})
       }

       //this code indicates that it will find the user input `id` in the mongoDb `_id` and then update it's properties with the new properties from the `...req.body`
       const workout = await Workout.findOneAndUpdate({_id: id}, {
              ...req.body
       });
       //what is req.body, it's a spread operator since there are 3 properties in title, reps, and load and we can't know which property we would like to update any given time, by using the spread operator, we can anticipate the number of properties to update

       if(!workout){
              return res.status(400).json({error: 'No such Workout'})
       }

       res.status(200).json(workout)
}

module.exports = {
       createWorkout,
       getWorkouts,
       getWorkout,
       deleteWorkout,
       updateWorkout,
}