const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
   patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
   },
   doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
   },
   date: {
      type: String,
      required: true
   },
   time: {
      type: String,
      required: true
   },

   isVideoConsultation: {
      type: Boolean,
      default: false
   },
   patientID:{
      type:String
   },
   doctorID:{
      type:String
   }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = {
   Appointment: Appointment
};
