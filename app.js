const express = require('express');
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const connectDB = require('./database/db')
const colors = require("colors");
const cors = require('cors')
// const path = require('path')

const userRoute = require('./routes/userRoute');
const appointmentRoute = require('./routes/appointmentRoute');
const doctorRoute = require('./routes/DoctorRoute');
const user=require('./routes/user');
const { mongo } = require('mongoose');
app.use(express.json());
// Connect to mongoDB database
app.use(cors());
app.use(userRoute);
app.use(doctorRoute);
app.use(appointmentRoute)
app.use(user)
dotenv.config();
// app.use(prescriptonRouter);

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