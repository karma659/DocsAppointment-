const express = require("express");
const {
   update,
   deleteP,
   signup,
   login,
   getall,
   dashboard
} = require("../controllers/patientController");
const {verifyToken} = require("../middlewares/authentication");

const patientRouter = express.Router();

patientRouter.post("/signup", signup);
patientRouter.post("/login", login);
patientRouter.patch("/update/:id", update);
patientRouter.delete("/delete/:id", deleteP);
patientRouter.get("/appointments", verifyToken, getall);
patientRouter.get("/dashboard", dashboard);
module.exports = patientRouter;
