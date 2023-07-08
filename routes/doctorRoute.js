const express = require("express");
const {
   updateDoctor,
   deleteDoctor,
   signup,
   login,
   getall
} = require("../controllers/doctorController");
const { verifyToken } = require("../middlewares/authentication");

const doctorRouter = express.Router();

doctorRouter.post("/signup", signup);
doctorRouter.post("/login", login);
doctorRouter.patch("/update/:id", verifyToken ,updateDoctor); // 
doctorRouter.delete("/delete/:id",verifyToken, deleteDoctor); //
doctorRouter.get("/appointments",verifyToken ,getall);

module.exports = doctorRouter;
