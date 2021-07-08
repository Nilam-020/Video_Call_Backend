// const express = require('express');
// const router = express.Router();
// const AppointmentInstance = require('../models/appointmentInstance');
// const Doctor = require('../models/DoctorModel');
// const auth =require('../middleware/auth')
// const {formatTime,checkTime,formattedToday,getFancyDate} = require('../utils/utils');

// router.post('/schedule/add/:id',(req,res)=>{
//     const docId = req.params.id;
//     const startdate = req.body.startdate;
//     const enddate = req.body.enddate;
//     const endTime = parseInt(req.body.endTime);
//     const startTime = parseInt(req.body.startTime);

//     let startAt = new Date(startdate);
//     let endAt = new Date(enddate);
     
//     while(startAt < endAt)
//     {
//     let startHours = new Date(startAt);
//     let endHours = new Date(startAt);
//     let midTime = new Date(startAt);
    
//     startHours.setHours(startTime,0,0);
//     endHours.setHours(endTime,0,0);
//     midTime.setHours(startTime,0,0);
  
//         while(startHours < endHours)
//         {
           
//             midTime.setMinutes(midTime.getMinutes()+30);
//             let drTime = `${startHours.getHours()}:${formatTime(startHours.getMinutes())}${checkTime(startHours.getHours())}-${midTime.getHours()}:${formatTime(midTime.getMinutes())}${checkTime(midTime.getHours())}`;
//             let date = `${startAt.getFullYear()}-${formatTime(startAt.getMonth())}-${formatTime(startAt.getDate())}`;
           
//         const appointmentInstance = new AppointmentInstance({doctor_id:docId,time:drTime,date:date,hour:startHours.getHours(),fancyDate:getFancyDate(date)});
//             appointmentInstance.save();
//             startHours.setMinutes(startHours.getMinutes()+30);
//         }
       
//         startAt.setDate(startAt.getDate()+1);
//     }
//     const scheduleDate = new Schedule({ DocID: docId, startdate: startdate, enddate: enddate, startTime: startTime, endTime: endTime })
//     scheduleDate.save()
//  .then((result) => {
//             Doctor.updateOne({_id:docId},{startTime:startTime,endTime:endTime}).then((result)=>{}).catch((err)=>{})
//            return res.status(200).json({ success: true, message: "appointment scheduled", scheduleDate })
//         })
//         .catch((err) => {
//             res.status(500).json({ error: err })

//         })
// })


// router.get('/retrieveAppointmentInstance/:did',(req,res)=>{
//     let did = req.params.did;
//     let today = formattedToday(new Date());
//     // let current = new Date();
//     // let hour = current.getHours();
//     console.log(today);
   
//     AppointmentInstance.find({
//         "doctor_id":did,
//         "date":{$gte:today},
      
//         "status":true
//     }).populate({
//         "path":"doctor_id"
//     })
//     .then((data)=>{
//         res.status(200).json({"success":true,"data":data,"message":"Retrieved"})
//     }).catch((err)=>{
//         res.status(404).json({"success":false,message:err})
//     })
// })
// router.get('/schedule/doctor',auth.verifiedDoctor,(req,res)=>{
//     Schedule.find({DocID:req.send._id })
//     .then((data) => {
//         res.status(200).json({ success: true, data:data })
//         console.log(data)
//     })
//     .catch((err) => {
//         res.status(500).json({ error: err })
//     })
// })

// module.exports = router;