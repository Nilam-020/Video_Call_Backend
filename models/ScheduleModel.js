const mongoose = require('mongoose');
const { ObjectId } = require('bson');
const Doctor = require('./DoctorModel');
const Patient = require('./userModel');


const Appointment = mongoose.model('Appointment', {
  DocID: {
    type: mongoose.Schema.Types.ObjectId, ref: Doctor
  },
  UID: {
    type: mongoose.Schema.Types.ObjectId, ref: Patient
  },
  description: {
    type: String
  },
  created_Date: {
    type: String
  },
  VID: {
    type: String
  },
  created_Time: {
    type: String
  },
  status: {
    type: String,
    enum: ['completed', 'unread'],
    default: 'unread'
  }
})

module.exports = Appointment;