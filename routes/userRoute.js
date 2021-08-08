const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const upload = require('../middleware/multer')
const Doctor = require('../models/DoctorModel');
const Patient = require('../models/userModel');

router.post('/user/register', [
    check('firstname', 'first name is required!').not().isEmpty(),
    check('lastname', 'first name is required!').not().isEmpty(),
    check('email', 'Email is required').isEmail()
], (req, res) => {
    // console.log("we are here")
    const errors = validationResult(req);
    if (errors.isEmpty()) {

        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const address = req.body.address;
        const date_of_birth = req.body.date_of_birth;
        const email = req.body.email;
        const gender = req.body.gender;
        const phone = req.body.phone;
        const password = req.body.password;
        bcryptjs.hash(password, 10, (err, hash) => {
            const data = new Patient({
                firstname: firstname,
                lastname: lastname,
                address: address,
                date_of_birth: date_of_birth,
                email: email,
                gender: gender,
                phone: phone,
                password: hash
            })

            data.save()
                .then((result) => {
                    //success message with status code
                    console.log(result);
                    res.status(201).json({ success: true, message: "user is created!", data: data })
                })
                .catch(function (err) {
                    res.status(500).json({ error: err })
                })

        })

    } else {
        //invalid data from client
        res.status(400).json(errors.array())
    }
});

router.post('/user/login', (req, res) => {
    const phone = req.body.phone
    const password = req.body.password
    Patient.findOne({ phone: phone })
        .then((patientData) => {
            if (patientData === null) {
                //email not found
                return res.status(201).json({ success: false, message: "Invalid Credentials!!" })
            }
            bcryptjs.compare(password, patientData.password, (err, result) => {
                if (result === false) {
                    //email not found
                    return res.status(201).json({ success: false, message: "Invalid Credentials!!" })
                }
                //generate token
                const token = jwt.sign({ patientId: patientData._id, phone: patientData.phone }, 'secretkey')
                res.status(200).json({ success: true, token: token, message: "Auth success", data: patientData })

            })
        })
        .catch((e) => {
            res.status(500).json({ error: e })
        })
})
router.get('/user/:id', (req, res) => {
    const id = req.params.id;
    Patient.findOne({ _id: id })
        .then((data) => {
            res.status(200).json({ success: true, data })
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
})
router.get('/user', (req, res) => {
    Patient.find()
        .then((data) => {
            return res.status(200).json({ success: true, data: data })
        })
        .catch((err) => {
            return res.status(500).json({ error: err })
        })
})
router.put('/user/update/:id', (req, res) => {
    const id = req.params.id;
    const blood_group = req.body.blood_group;
    const occupation = req.body.occupation;
    const marital_status = req.body.marital_status;
    const smoking_habit = req.body.smoking_habit;
    const feet = req.body.feet;
    const inch = req.body.inch;
    const weight = req.body.weight;

    Patient.findOneAndUpdate({ _id: id }, {
        $set: {
            blood_group: blood_group,
            occupation: occupation,
            marital_status: marital_status,
            smoking_habit: smoking_habit,
            feet: feet,
            inch: inch,
            weight: weight
        }
    }).then((result) => {
        Patient.findOne({ _id: result._id }).then((mydata) => {
            res.status(200).json({ success: true, message: "patient data updated", data: mydata })
        })
    })
        .catch((err) => {
            res.status(500).json({ error: err })
        })

});

router.get('/user', auth.verifiedUser, auth.verifiedDoctor, (req, res) => {
    Patient.findOne({ _id: req.send._id })
        .then((data) => {
            res.status(200).json({ success: true, data })
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
})
//update user proile
router.put('/user/profile/update/:id', (req, res) => {

    const id = req.params.id;
    const address = req.body.address;
    const email = req.body.email;

    Patient.findOneAndUpdate({ _id: id }, {
        $set: {
            address: address,
            email: email
        }

    })
        .then((result) => {
            Patient.findOne({ _id: result._id }).then((mydata) => {
                res.status(200).json({ success: true, message: "patient data updated", data: mydata })
            })
                .catch((err) => {
                    res.status(500).json({ error: err })
                })

        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
})
router.put('/user/picture', upload.single('profile'), auth.verifiedUser, (req, res) => {
    if (req.file == undefined) {
        return res.status(400).json({ message: "Invalid File type format. PNG and JPEG accepted" })
    }

    const id = req.send._id;
    const profile = req.file.path;
    console.log(req.file)
    Patient.findOneAndUpdate({ _id: id }, {
        profile: profile,
    })
        .then((result) => {

            Patient.findOne({ _id: result._id })
                .then((data1) => {
                    res.status(200).json({ success: true, message: "patient data updated", data: data1 })
                })
                .catch((err) => {
                    res.status(500).json({ success: false, error: err, message: "Image upload failed" })
                })
        })
        .catch((err) => {
            res.status(500).json({ success: false, error: err, message: "Image upload failed" })
        })
})

router.put('/staff/profile/update/:id', (req, res) => {

    const id = req.params.id;
    const address = req.body.address;
    const email = req.body.email;

   Patient.findOneAndUpdate({ _id: id }, {
        $set: {
            address: address,
            email: email
        }

    })
        .then((result) => {
            Patient.findOne({ _id: result._id }).then((mydata) => {
                res.status(200).json({ success: true, message: "Information Updated", data: mydata })
            })
                .catch((err) => {
                    res.status(500).json({ error: err })
                })

        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
})

module.exports = router;