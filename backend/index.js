require('dotenv').config()
const express = require('express');
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')
const cors = require('cors')

//express app
const app = express()

app.get('/', (req, res) => {
       res.send('Hello World')
     })

//middleware
app.use(cors());
app.use(express.json())

app.use((req,res,next)=>{
       console.log(req.path, req.method)
       next();
})

//routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI) // is equal to connected to database first 
       .then(()=>{ 
              //listen for request from a URL or port that will be sent to the database
              app.listen((process.env.PORT), () => {
                     console.log("connected to db and listening on port", process.env.PORT)
              })
       })
       .catch((error)=>{
              console.log(error)
              console.log('There is an error Controller ');
       })
