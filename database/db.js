const mongoose = require('mongoose');
const colors = require("colors");
const mongoPath = 'mongodb://127.0.0.1:27017/appointmentBooking_Api'
mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
});
console.log(
    `MongoDB connected`.blue.bold
);




