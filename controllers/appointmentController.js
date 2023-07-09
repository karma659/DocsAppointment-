const express = require("express");

const {Appointment} = require("../models/appointmentschema");
const {Doctor} = require("../models/doctorSchema");
const {VideoCall} = require("../models/videoCallSchema");

//Get all appointment
const getall = async (req, res) => {
   console.log("data");
   try {
      let data = await Appointment.find().populate("doctor").populate("patient");
      console.log(data);
      res.status(200).send({Appointments: data});
   } catch (err) {
      res.status(404).send({ERROR: err});
   }
};

//create appointment
const create = async (req, res) => {
   var {doctor, date, time, isVideoConsultation, patient} = req.body;
   if (!patient) {
      patient = req.userId;
   }
   console.log(doctor, date, time, isVideoConsultation, patient);
   try {
      const exist = await Appointment.findOne({
         doctor,
         date,
         time
      });

      if (exist) {
         return res.status(200).send("Time slot not available. Please choose a different time.");
      }
      const appointment = new Appointment({
         doctor,
         patient,
         date,
         time,
         isVideoConsultation
      });
      await appointment.save();
      // Save the appointment to the doctor's appointments array

      const doctorObj = await Doctor.findById(doctor);
      doctorObj.appointments.push(appointment._id);
      await doctorObj.save();

      res.status(201).send({message: "Appointment booked successfully"});
   } catch (error) {
      console.log(error);
      res.status(500).send({error: "An error occurred while booking the appointment"});
   }
};

// update appointment
const update = async (req, res) => {
   const ID = req.params.id;
   const payload = req.body;
   try {
      await Appointment.findByIdAndUpdate({_id: ID}, payload);

      // Find the doctor associated with the appointment
      const appointment = await Appointment.findById(ID);
      const doctorId = appointment.doctor;

      res.status(201).send({message: "Appointment modified"});
   } catch (err) {
      console.log(err);
      res.send({message: "error"});
   }
};

// delete appointment
const deleteA = async (req, res) => {
   const ID = req.params.id;
   try {
      const appointment = await Appointment.findById(ID);
      const doctorId = appointment.doctor;
      const doctor = await Doctor.findById(doctorId);

      doctor.appointments.pull(ID);
      await doctor.save();

      await Appointment.findByIdAndDelete({_id: ID});
      res.send({message: "Particular Appointment has been deleted"});
   } catch (err) {
      console.log(err);
      res.send({message: "error"});
   }
};

// get socket Id appointment
const getSocketId = async (req, res) => {
   const ID = req.params.id;
   try {
      const appointment = await Appointment.findById(ID);
      // console.log("appointment ", appointment);
      const patientId = appointment.patientID;
      const doctorId = appointment.doctorID;  
      const data = {
         patientId: patientId,
         doctorId: doctorId
      };
      console.log("patient doctor ids ", data);
      res.status(201).send(data);
   } catch (err) {
      console.log(err);
      res.send({message: "error"});
   }
};

module.exports = {
   getall: getall,
   create: create,
   update: update,
   deleteA: deleteA,
   getSocketId: getSocketId
};
