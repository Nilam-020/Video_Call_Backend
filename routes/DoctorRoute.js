const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
const Doctor = require('../models/DoctorModel');
const Rating = require('../models/ratingModel');
const cloudinary = require('../utils/cloudinary');
const upload = require('../middleware/multer')


router.post('/doctor/register', upload.single('image'), async (req, res) => {
    try {


        const result = await cloudinary.uploader.upload(req.file.path);
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const address = req.body.address;
        const department = req.body.department;
        const nmc = req.body.nmc;
        const email = req.body.email;
        const gender = req.body.gender;
        const phone = req.body.phone;
        const password = req.body.password;
        const worked = req.body.worked;

        bcryptjs.hash(password, 10, (err, hash) => {
            let data = new Doctor({
                cloudinary_id: result.public_id,
                profile: result.secure_url,
                firstname: firstname,
                lastname: lastname,
                address: address,
                department: department,
                nmc: nmc,
                email: email,
                gender: gender,
                phone: phone,
                worked: worked,
                password: hash
            })
            res.json(result)
            data.save()
                .then((result) => {
                    res.status(200).json({ success: true, message: "Doctor account created!", data: data })
                })
                .catch((err) => {
                    res.status(500).json({ error: err })
                })
        })
    } catch (err) {
        console.log(err)
    }
});

router.get('/doctor', (req, res) => {

    Doctor.find({})
        .then((data) => {
            return res.status(200).json({ success: true, count: data.length, data: data })
        })
        .catch((err) => {
            return res.status(500).json({ error: err })
        })
})

router.post('/doctor/login', (req, res) => {
    const phone = req.body.phone
    const password = req.body.password
    Doctor.findOne({ phone: phone })
        .then((DoctorData) => {
            if (DoctorData === null) {
                //email not found
                return res.status(201).json({ message: "Invalid Credentials!!" })
            }
            bcryptjs.compare(password, DoctorData.password, (err, result) => {
                if (result === false) {
                    //email not found
                    return res.status(201).json({ message: "Invalid Credentials!!" })
                }
                //generate token
                const token = jwt.sign({ DocId: DoctorData._id, phone: DoctorData.phone }, 'secretkey')
                res.status(200).json({ success: true, token: token, message: "Auth success", data: DoctorData })

            })
        })
        .catch((e) => {
            res.status(401).json({ error: e })
        })
})

router.delete('/doctor/delete/:id',async (req, res) => {
    try{
        const id = req.params.id;
        await cloudinary.uploader.destroy({ _id: id.cloudinary_id })
        Doctor.deleteOne({ _id: id })
            .then((result) => {
                res.status(200).json({ success: true, message: "doctor deleted" })
            }).catch((err) => {
                res.status(500).json({ error: err })
            })
    }catch{

    }
})


router.post('/doctor/rating/:id', auth.verifiedUser, (req, res) => {
    const docId = req.params.id;
    const UID = req.send._id;
    const rating = req.body.rating;
    Rating.findOne({ DocID: docId, UID: UID })
        .then((data1) => {
            if (data1 == null) {
                const ratingData = new Rating({
                    DocID: docId,
                    UID: UID,
                    rating: rating
                })
                ratingData.save()
                    .then((result) => {
                        var rating = 0
                        var total = 0
                        Rating.find({ DocID: docId })
                            .then((data) => {

                                if (data.length > 0) {
                                    for (r of data) {
                                        total += r.rating
                                    }
                                    rating = total / data.length
                                    Doctor.updateOne({ "_id": docId }, { $set: { "rating": rating } }).then((result) => {
                                        res.status(200).json({ success: true, message: "updated", data: rating })
                                    }).catch((err) => {
                                        res.status(404).json({ success: false, message: err })
                                    })
                                } else {
                                    res.status(200).json({ success: true, message: "calcuated", data: rating })

                                }
                            }).catch((err) => {
                                res.status(500).json({ error: err })
                            })

                        //   res.status(200).json({ success: true, mesage: "rating added", data: ratingData })
                    }).catch((err) => {
                        res.status(500).json({ error: err })
                    })
            }

        })
})

router.put('/doctor/rating/update/:id', auth.verifiedUser, (req, res) => {
    const docId = req.params.id;
    const UID = req.send._id;
    const rating = req.body.rating;
    Rating.findOne({ DocID: docId, UID: UID }).then((rateData) => {
        if (rateData == null) {
            Rating.updateOne({ _id: docId, UID: UID }, {
                $set: {
                    rating: rating
                }
            }).then((result) => {
                var rating = 0
                var total = 0
                Rating.find({
                    DocID: req.params.did,
                    UID: req.send._id
                })
                    .then((data) => {

                        if (data.length > 0) {
                            for (r of data) {
                                total += r.rating
                            }
                            rating = total / data.length
                            Doctor.updateOne({ "_id": docId }, { $set: { "rating": rating } }).then((result) => {
                                res.status(200).json({ success: true, message: "updated", data: rating })
                            }).catch((err) => {
                                res.status(404).json({ success: false, message: err })
                            })
                        } else {
                            res.status(200).json({ success: true, message: "calcuated", data: rating })

                        }
                    }).catch((err) => {
                        res.status(500).json({ error: err })
                    })
                res.status(200).json({ success: true, message: "rating updated", data: result })
            })
                .catch((err) => {
                    res.status(500).json({ success: false, message: "update failed" })
                })
        }
    })

})

router.get('/myRatings/:did', auth.verifiedUser, (req, res) => {

    Rating.findOne({
        DocID: req.params.did,
        UID: req.send._id
    }).then((data) => {
        if (data != null) {
            return res.status(200).json({ "success": true, "rating": data.rating })
        }
        else {
            return res.status(202).json({ "success": false, "data": data })
        }

    }).catch((err) => {
        console.log(err)
        return res.status(404).json({ "success": false, "message": err })
    })
})

router.put('/doctor/update/:id', (req, res) => {
    const id = req.params.id;
    const address = req.body.address;
    const department = req.body.department
    const worked = req.body.worked;
    const specialisation = req.body.specialisation;
    const description = req.body.description;
    const consultationFee = req.body.consultationFee;

    Doctor.findOneAndUpdate({ _id: id }, {
        $set: {
            address: address,
            department: department,
            worked: worked,
            specialisation: specialisation,
            description: description,
            consultationFee: consultationFee
        }

    }).then((result) => {
        Doctor.findOne({ _id: result._id }).then((mydata) => {
            res.status(200).json({ success: true, message: "doctor data updated", data: mydata })
        })
    }).catch((err) => {
        res.status(500).json({ error: err })
    })
})


router.get('/doctor/:id', (req, res) => {
    const id = req.params.id;
    Doctor.findOne({ _id: id }).then((result) => {
        res.status(200).json({ success: true, mesage: "doctor", data: result })
    }).catch((err) => {
        res.status(500).json({ error: err })
    })
})

//update user proile
router.put('/doctor/profile/update/:id', (req, res) => {

    const id = req.params.id;
    const address = req.body.address;
    const email = req.body.email;

    Doctor.findOneAndUpdate({ _id: id }, {
        $set: {
            address: address,
            email: email
        }

    })
        .then((result) => {
            Doctor.findOne({ _id: result._id }).then((mydata) => {
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

router.post('/demo', upload.single("image"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        res.json(result)
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router;