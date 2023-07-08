const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Patient} = require("../models/patientSchema");
const {Appointment} = require("../models/appointmentschema");
const {Doctor} = require("../models/doctorSchema");

const signup = async (req, res) => {
   const {name, email, password} = req.body;

   try {
      const userr = await Patient.find({email});

      if (userr.length) {
         res.status(200).json({msg: "Patient exist please Login"});
      } else {
         //Hash password
         const hashedPassword = await bcrypt.hash(password, 10);
         let user = new Patient({name, email, password: hashedPassword});
         await user.save();

         res.status(201).json({msg: "New Patient registered"});
      }
   } catch (err) {
      console.log("ERROR Cant Signup", err);
      res.status(401).send({message: err});
   }
};

const login = async (req, res) => {
   const {email, password} = req.body;

   try {
      const user = await Patient.findOne({email});

      if (user && (await bcrypt.compare(password, user.password))) {
         const token = jwt.sign(
            {userId: user._id, role: user.role},
            process.env.ACCESS_TOKEN_SECERT,
            {
               expiresIn: "12h"
            }
         );

         res.setHeader("authorization", `Bearer ${token}`);
         console.log({msg: "Patient successfully logged in", token: token});
         res.status(201).json({msg: "Patient successfully logged in", token: token, ID: user._id});
      } else {
         res.status(200).send({msg: "Unauthorized  Invalid email or password"});
      }
   } catch (err) {
      console.log("Error Cant Login", err);
      res.status(401).send({message: err});
   }
};

const update = async (req, res) => {
   const ID = req.params.id;
   console.log(ID);
   try {
      let data = await Patient.findByIdAndUpdate({_id: ID}, req.body);
      console.log(data);
      res.status(200).send(data);
   } catch (err) {
      console.log({msg: "Error Occured", error: err});
   }
};

const deleteP = async (req, res) => {
   const ID = req.params.id;
   try {
      await Patient.findByIdAndDelete({_id: ID});
      res.status(204).send("Patient  Deleted");
   } catch (err) {
      console.log({msg: "Error Occured", error: err});
   }
};

const getall = async (req, res) => {
   const ID = req.userId;
   try {
      let data = await Appointment.find({patient: ID}).populate("doctor");
      console.log("data ", data);

      res.status(200).send({Appointments: data});
   } catch (err) {
      res.status(500).send({ERROR: err});
   }
};

const dashboard = async (req, res) => {
   try {
      let data = await Doctor.find().populate("appointments");
     

      res.status(200).send(data);
   } catch (err) {
      res.status(500).send({ERROR: err});
   }
};

module.exports = {
   signup: signup,
   login: login,
   update: update,
   deleteP: deleteP,
   getall: getall,
   dashboard: dashboard
};
