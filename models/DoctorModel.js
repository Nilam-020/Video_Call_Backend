const mongoose = require('mongoose');
const Rating = require('./ratingModel');

const Doctor = mongoose.model('Doctor', {
    profile: {
        type: String,
        "default":"no-photo.jpg"
    },
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    department: {
        type: String,
        trim: true
    },
    nmc: {
        type: String,
        trim: true
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    phone: {
        type: String,
        unique: true,
        trim: true

    },
    password: {
        type: String,
        minlength: 8
    },
    specialisation: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    consultationFee: {
        type: Number
    },
    worked:{
        type:String
    },
    isActive:{
        type: Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    rating:{
        type:Number
    },
    user_type: {
        type: String,
        enum:["Doctor"],
        default: "Doctor",
        trim: true
    },
    cloudinary_id: {
        type: String
    }
})

module.exports = Doctor;