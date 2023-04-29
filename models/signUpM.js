const mongoose = require("mongoose") 

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    lastName: {
        type: String,
        required: true
      },
    secondLastName:{
        type: String,
        required: true
      },
    identification:{
        type: String,
        required: true,
        unique: true
      },
    email: {
      type: String,
      required: true,
      unique: true, 
    },

    number:{
        type: String,
        required: true
      },
    birthDay:{
        type: String,
        required: true
      },
    photo: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      default: "user"
    },
    approved:{
      type: Boolean,
      required: true,
      // enum: ["pending", "approved", "rejected"]
      // default: 'pending/'
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function () {
        return this.createdAt.toLocaleDateString();
      }
    }
  });



const User = mongoose.model("pending_users", userSchema)
module.exports =  User