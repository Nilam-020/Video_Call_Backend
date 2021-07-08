const mongoose = require('mongoose');

const Patient = mongoose.model('Patient', {
    profile: {
        type: String
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

        trim: true
    },
    date_of_birth: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        minlength: 10,
        maxlenght: 10,
        trim: true

    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    blood_group: {
        type: String,
        trim: true,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O-", "O+"],
        maxlenght: 2
    },
    occupation: {
        type: String,
        trim: true
    },
    marital_status: {
        type: String,
        enum: ["married", "unmarried"],
        trim: true
    },
    smoking_habit: {
        type: String,
        enum: ["no", "yes"],
        trim: true
    },
    feet:
    {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    inch: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

    },
    weight: {
        type: Number,
        trim: true,
        maxlenght: 3
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user_type: {
        type: String,
        enum: ["Patient","Admin", "Staff","Doctor"],
        default: "Patient",
        trim: true
    },
})

module.exports = Patient