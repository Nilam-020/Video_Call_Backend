const express = require('express');
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const connectDB = require('./database/db')
const colors = require("colors");
const cors = require('cors')
const path = require('path')

const userRoute = require('./routes/userRoute');
const appointmentRoute = require('./routes/appointmentRoute');
const doctorRoute = require('./routes/DoctorRoute');
// const prescriptonRouter=require('./routes/prescriptionRoute');


// const instanceRouter = require('./routes/appointmentInstanceRoute');
const { mongo } = require('mongoose');
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")))
// Connect to mongoDB database
app.use(cors());
app.use(userRoute);
app.use(doctorRoute);
app.use(appointmentRoute)

// app.use(prescriptonRouter);




dotenv.config({
    path: "./config/config.env",
});

const PORT = process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send('server is connected')
})
app.listen(
    PORT,
    console.log(
        `Server running in mode : ${process.env.NODE_ENV},on port : ${PORT}`.yellow.bold
    )
);