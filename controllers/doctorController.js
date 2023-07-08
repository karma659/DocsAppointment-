const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Doctor} = require("../models/doctorSchema");

const signup = async (req, res) => {
   const {name, email, password, specialty} = req.body;

   try {
      const userr = await Doctor.find({email});

      if (userr.length) {
         res.status(200).json({msg: "Doctor exist please Login"});
      } else {
         //Hash password
         const hashedPassword = await bcrypt.hash(password, 10);

         let user = new Doctor({name, email, password: hashedPassword});
         await user.save();

         res.status(201).json({msg: "New Doctor registered"});
      }
   } catch (err) {
      console.log("ERROR Cant Signup", err);
      res.status(401).send({message: err});
   }
};

const login = async (req, res) => {
   const {email, password} = req.body;

   try {
      const user = await Doctor.findOne({email});

      if (user && (await bcrypt.compare(password, user.password))) {
         const token = jwt.sign(
            {userId: user._id, role: user.role},
            process.env.ACCESS_TOKEN_SECERT,
            {
               expiresIn: "12h"
            }
         );

         res.setHeader("authorization", `Bearer ${token}`);
         console.log({msg: "Doctor successfully logged in", token: token, ID: user._id});
         res.status(201).json({msg: "Doctor successfully logged in", token: token, ID: user._id});
      } else {
         res.status(200).send({msg: "Unauthorized  Invalid email or password"});
      }
   } catch (err) {
      console.log("Error Cant Login", err);
      res.status(401).send({message: "INVALID credentials"});
   }
};

const updateDoctor = async (req, res) => {
   const ID = req.params.id;
   try {
      let data = await Doctor.findByIdAndUpdate({_id: ID}, req.body);
      res.status(201).send(data);
   } catch (err) {
      console.log({msg: "Error Occured", error: err});
   }
};

const deleteDoctor = async (req, res) => {
   const ID = req.params.id;
   try {
      await Doctor.findByIdAndDelete({_id: ID});
      res.status(200).send(`Doctor  Deleted`);
   } catch (err) {
      console.log({msg: "Error Occured", error: err});
   }
};

const getall = async (req, res) => {
   const ID = req.userId;
   try {

      const doctor = await Doctor.findById(ID)
      .populate({
        path: "appointments",
        populate: {
          path: "patient",
          model: "Patient"
        }
      })
      .exec();
    
     
      res.status(200).send({Appointments: doctor.appointments});
   } catch (err) {
      res.status(500).send({ERROR: err});
   }
};

module.exports = {
   signup: signup,
   login: login,
   updateDoctor: updateDoctor,
   deleteDoctor: deleteDoctor,
   getall: getall
};
