const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth');
const upload = require('../middleware/upload')
const Schedule = require('../models/ScheduleModel')

router.post('/appointment/add/:id', auth.verifiedUser, (req, res, next) => {

    const DocID = req.params.id;
    const UID = req.send._id;
    const description=req.body.description;
    const VID=req.body.VID;

    const scheduledata = new Schedule({DocID:DocID, UID:UID , description:description,VID:VID})
    scheduledata.save()
    .then((result) => {
        res.status(201).json({ success: true, message: "appointment added" })
    }).catch((err) => {        
        res.status(500).json({ error: err })
    })
})

// router.put('/appointment/update/:id', (req, res) => {
//     const date = req.body.date;
//     const time = req.body.time;
//     const id = req.params.id;

//     Appointment.updateOne({ _id: id }, {
//         date: date,
//         time: time,
//     }).then((result) => {
//         res.status(200).json({ success: true, message: "Updated!", data: result })
//     }).catch((err) => {
//         res.status(500).json({ error: err })

//     })
// })
// //delete
// router.post('/appointment/delete/:id', (req, res) => {
//     const id = req.params.id;
//     Appointment.findOne({_id:id})
//     .then((data)=>{
//         if(data!=null)
//         {
//             AppointmentInstance.updateOne({_id:data.AppointmentInstanceId},{status:true}).then((result)=>{
//                 Appointment.deleteOne({_id:data._id})
//                 .then((result2)=>{
//                     return res.status(200).json({"success":true,"message":"Deleted"})
//                 })
//                 .catch((err)=>{
//                     return res.status(404).json({err:err})
//                 })

//             })
//             .catch((err)=>{
//                 return res.status(404).json({err:err})
//             })
//         }
//     })
//     .catch((err)=>{
//         return res.status(404).json({err:err})
//     })
// })
// router.get('/appointment', (req, res) => {
//     Appointment.find()
//         .then((data) => {
//             res.status(200).json({ success: true, data: data })
//         }).catch((err) => {
//             res.status(500).json({ error: err })
//         })
// })

// router.get("/appointment/single/:id",(req,res)=>{
//     var id = req.params.id;
//     Appointment.findOne({"_id":id}).populate({ path: " AppointmentInstanceId", populate: { path: "doctor_id" } }).populate("UID")
//     .then((data)=>{
//         return res.status(200).json({"success":true,"message":"Retrieved","singleData":data})
//     })
//     .catch((err)=>{
//         return res.status(401).json({"success":false,"message":""})
//     })
// })

router.get('/appointment/doctor', auth.verifiedDoctor, (req, res) => {
    Schedule.find({DocID:req.send._id }).populate({ path: "_id", populate: { path: "DocID",match:{_id:req.send._id} }}).populate("UID")
        .then((data) => {
            res.status(200).json({ data: data, success: true })
        })
        .catch((err) => {
            res.status(500).json({ success: false, message: err })
        })
})

module.exports = router;