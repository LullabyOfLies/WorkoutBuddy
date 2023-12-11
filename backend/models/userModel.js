const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

//Schema is a set of rules that's enforced to make sure that the data within the database is appropriate. Defines the structure of a document inside a database

//Model applies a Schema to a Model and use a Model to interact with a collect of a name.

//Models makes sure that there are no unnecessary data stored in the database

const Schema = mongoose.Schema

const userSchema = new Schema({
       email: {
              type: String,
              require: true,
              unique: true,
       },
       password: {
              type: String, 
              require: true,
              
       }

})

//static signup method
userSchema.statics.signup = async function(email, password) {

       //validation of email and password
       if(!email || !password){
              throw Error('All fields must be filled!')
       }

       if(!validator.isEmail(email)){
              throw Error('Email is not valid')
       }

       if(!validator.isStrongPassword(password)){
              throw Error('Password not strong enough')
       }

       const exists = await this.findOne({ email })
       if(exists){
              throw Error('Email already linked to another account')
       }

       //mypassword 

       const salt = await bcrypt.genSalt(10)
       const hash = await bcrypt.hash(password, salt)

       const user = await this.create({ email, password: hash })

       return user
}

//static login method
userSchema.statics.login = async function (email, password){
         //validation of email and password
         if(!email || !password){
              throw Error('All fields must be filled!')
       }

       const user = await this.findOne({ email })
       
       if(!user){
              throw Error('Incorrect Email')
       }

       const match = await bcrypt.compare(password, user.password)

       if(!match){
              throw Error('Incorrect Password')
       }

       return user
}

module.exports = mongoose.model('User', userSchema)
