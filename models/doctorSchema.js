const mongoose = require("mongoose");


const doctorSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: String,
      default: "doctor"
   },
   name: {
      type: String,
      required: true
   },
   specialty: {
      type: String,
      required: true,
      default: "MBBS"
   },
   appointments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Appointment"
      }
   ]
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = {
   Doctor: Doctor
};
