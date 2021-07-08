const mongoose = require('mongoose');
const Rating = require('./ratingModel');

const Doctor = mongoose.model('Doctor', {
    profile: {
        type: String,
        "default":"no-photo.jpg"
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    nmc: {
        type: String,
        require: true,
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
        required: true,
        trim: true

    },
    password: {
        type: String,
        required: true,
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
})

module.exports = Doctor;