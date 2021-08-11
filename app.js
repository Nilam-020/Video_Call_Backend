const express = require('express');
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
const connectDB = require('./database/db')
const colors = require("colors");
const cors = require('cors')

const userRoute = require('./routes/userRoute');
const appointmentRoute = require('./routes/appointmentRoute');
const doctorRoute = require('./routes/DoctorRoute');
const { mongo } = require('mongoose');
app.use(express.json());
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Connect to mongoDB database
app.use(cors());
app.use(userRoute);
app.use(doctorRoute);
app.use(appointmentRoute)
dotenv.config();
// app.use(prescriptonRouter);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('server is connected')
})

io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    });
});

server.listen(
    PORT,
    console.log(
        `Server running in mode : ${process.env.NODE_ENV},on port : ${PORT}`.yellow.bold
    )
);