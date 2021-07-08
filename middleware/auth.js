const jwt = require('jsonwebtoken');
const Patient = require('../models/userModel');
const Doctor = require('../models/DoctorModel');

module.exports.verifiedUser = ((req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const userData = jwt.verify(token, 'secretkey');

        Patient.findOne({ _id: userData.patientId })
            .then((result) => {
                req.send = result
                next()
            }).catch((err) => {
                res.status(500).json({ error: err })
            })
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: "auth failed" })
    }
})

module.exports.verifiedDoctor = ((req, res, next) => {
    console.log(req.headers.authorization.split(" ")[1])
    try {
        const token = req.headers.authorization.split(" ")[1];
        const DoctorData = jwt.verify(token, 'secretkey');

        Doctor.findOne({ _id: DoctorData.DocId })
            .then((result) => {
                req.send = result
                next()
            }).catch((err) => {
               
                res.status(500).json({ error: err })
            })
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: "auth failed" })
    }
})