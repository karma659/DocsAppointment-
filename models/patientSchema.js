const mongoose = require("mongoose");


const patientSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'patient',
    },
   name: {
      type: String,
      required: true
   },

});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = {
   Patient:Patient
};
