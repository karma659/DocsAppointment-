const {mongoose} = require("mongoose");
const Appointment = require("./appointmentschema");

const videoCallSchema = new mongoose.Schema({
   appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true
   },
   patientID: {
      type: String
   },
   doctorID: {
      type: String
   }
});

const VideoCall = mongoose.model("VideoCall", videoCallSchema);

module.exports = {
   VideoCall
};
