var express = require("express");
var cors = require("cors");

const dotenv = require("dotenv");
var connectDb = require("./models/connectionDB");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const https = require("https");
const fs = require("fs");

var app = express();
const dirname = path.resolve();
// Load SSL certificate and key

const privateKey = fs.readFileSync(path.join(dirname, "cert", "key.pem"));

const certificate = fs.readFileSync(path.join(dirname, "cert", "cert.pem"));
const credentials = {
   key: privateKey,
   cert: certificate
};

// Create HTTPS server
// const server = https.createServer(credentials, app);
// const io = require("socket.io")(server, {
//    cors: {
//       origin: "*",
//       methods: ["GET", "POST"]
//    }
// });
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
   cors: {
      origin: "*",
      methods: ["GET", "POST"]
   }
});
app.use(cors());

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
dotenv.config();
connectDb();
var port = process.env.PORT || 5000;

// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));a

// if (process.env.NODE_ENV === "production") {
//    app.use(express.static(path.join(__dirname, "/frontend/build")));
//    console.log("production");
//    app.get("/", (req, res) =>
//       res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//    );
// } else {
app.get("/", (req, res) => {
   res.send("API is running....");
});
//}

const adminRouter = require("./routes/adminRoute");
const doctorRouter = require("./routes/doctorRoute");
const patientRouter = require("./routes/patientRoute");
const appointmentRouter = require("./routes/appointmentRoute");
const {VideoCall} = require("./models/videoCallSchema");
const {Appointment} = require("./models/appointmentschema");

app.use("/patient", patientRouter);
app.use("/doctor", doctorRouter);
app.use("/appointment", appointmentRouter);
app.use("/admin", adminRouter);

io.on("connection", socket => {
   socket.on("createSocketId", async ({data}) => {
      // Generate a socket ID for the user
      var socketId = socket.id;
      // Save the socket ID in the database based on the user's role
      if (data) {
         if (data.role === "patient") {
            console.log("patient", socketId);

            const payload = {
               patientID: socketId
            };
            try {
               await Appointment.findByIdAndUpdate({_id: data.appointmentId}, payload);
            } catch (err) {
               console.log("ERROR DB", err);
            }
         } else if (data.role === "doctor") {
            console.log("appointment id ", data.appointmentId);

            const payload = {
               doctorID: socketId
            };
            try {
               await Appointment.findByIdAndUpdate({_id: data.appointmentId}, payload);
            } catch (err) {
               console.log("ERROR DB", err);
            }
         }

         // Send the socket ID back to the client
         socket.emit("socketIdCreated", {socketId});
      }
   });

   socket.on("hangUp", () => {
      socket.broadcast.emit("callEnded");
   });

   socket.on("callUser", ({userToCall, signalData, from, name}) => {
      console.log("callUser", userToCall, "signal", signalData, "from", from, "name", name);
      io.to(userToCall).emit("callUser", {signal: signalData, from, name});
   });

   socket.on("answerCall", data => {
      console.log("answerCall", data);
      io.to(data.to).emit("callAccepted", data.signal);
   });

   // Close the socket.io connection
   socket.on("closeConnection", () => {
      socket.disconnect();
   });
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
// Start the server
