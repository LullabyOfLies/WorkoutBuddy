require('dotenv').config()
const express = require('express');
const workoutRoutes = require('../routes/workouts')
const userRoutes = require('../routes/user')
const mongoose = require('mongoose')
const cors = require('cors')


//express app
const app = express()

app.get('/', (req, res) => {
       res.send('Hello World')
     })

//middleware
app.use(cors(
       {
              origin: ["https://workout-buddy-api-self.vercel.app"],
              methods : ["POST", "GET", "DELETE"],
              credentials: true
       }
));
app.use(express.json())

app.use((req,res,next)=>{
       console.log(req.path, req.method)
       next();
})

//routes
app.use('/apis/workouts',workoutRoutes)
app.use('/apis/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI) // is equal to connected to database first 
       .then(()=>{ 
              //listen for request from a URL or port that will be sent to the database
              app.listen(process.env.DOMAIN, () => {
                     console.log("connected to db and listening on port 3000!")
              })
       })
       .catch((error)=>{
              console.log(error)
              console.log('There is an error Controller ');
       })


