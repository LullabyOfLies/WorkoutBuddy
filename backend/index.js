// require('dotenv').config()
 const express = require('express');
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')
const cors = require('cors')

const MONGO_URI = "mongodb+srv://DjinnLorenz:RecatoFamily97@mernapp.d588qnu.mongodb.net/?retryWrites=true&w=majority"

const DOMAIN = "https://workout-buddy-api.vercel.app"

//express app
const app = express()

app.get('/', (req, res) => {
       res.send('Hello World')
     })

//middleware
app.use(cors(
       {
              origin: ["https://workout-buddy-two.vercel.app/login"],
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
app.use('/api/workouts',workoutRoutes)
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(MONGO_URI) // is equal to connected to database first 
       .then(()=>{ 
              //listen for request from a URL or port that will be sent to the database
              app.listen(("/"), () => {
                     console.log("connected to db and listening on port 3000!")
              })
       })
       .catch((error)=>{
              console.log(error)
              console.log('There is an error Controller ');
       })


