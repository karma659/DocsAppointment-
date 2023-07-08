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
doctorRouter.patch("/update/:id", updateDoctor);
doctorRouter.delete("/delete/:id", deleteDoctor);
doctorRouter.get("/appointments",verifyToken ,getall);

module.exports = doctorRouter;
