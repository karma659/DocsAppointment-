const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Admin} = require("../models/adminSchema");
const {Patient} = require("../models/patientSchema");
const {Doctor} = require("../models/doctorSchema");

const signup = async (req, res) => {
   const {name, email, password} = req.body;

   try {
      const userr = await Admin.find({email});

      if (userr.length) {
         res.status(200).json({msg: "Admin exist please Login"});
      } else {
         //Hash password
         const hashedPassword = await bcrypt.hash(password, 10);

         let user = new Admin({name, email, password: hashedPassword});
         await user.save();

         res.status(201).json({msg: "New Admin registered"});
      }
   } catch (err) {
      console.log("ERROR Cant Signup", err);
      res.status(401).send({message: err});
   }
};

const login = async (req, res) => {
   const {email, password} = req.body;

   try {
      const user = await Admin.findOne({email});

      if (user && (await bcrypt.compare(password, user.password))) {
         const token = jwt.sign(
            {userId: user._id, role: user.role},
            process.env.ACCESS_TOKEN_SECERT,
            {
               expiresIn: "12h"
            }
         );

         res.setHeader("authorization", `Bearer ${token}`);
         console.log({msg: "Admin successfully logged in", token: token, ID: user._id});
         res.status(201).json({msg: "Admin successfully logged in", token: token, ID: user._id});
      } else {
         res.status(200).send({msg: "Unauthorized  Invalid email or password"});
      }
   } catch (err) {
      console.log("Error Cant Login", err);
      res.status(401).send({message: err});
   }
};

const SelectDoctor = async (req, res) => {
   try {
      let data = await Doctor.find().populate("appointments");
      console.log("data ", data);

      res.status(200).send(data);
   } catch (err) {
      res.status(500).send({ERROR: err});
   }
};
const SelectPatient = async (req, res) => {
   try {
      let data = await Patient.find().populate();
      console.log("data ", data);

      res.status(200).send(data);
   } catch (err) {
      res.status(500).send({ERROR: err});
   }
};

module.exports = {
   signup: signup,
   login: login,
   SelectDoctor: SelectDoctor,
   SelectPatient: SelectPatient
};
