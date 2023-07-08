const express = require("express");
const {signup, login, SelectDoctor, SelectPatient} = require("../controllers/adminController");

const adminRouter = express.Router();

adminRouter.post("/signup", signup);
adminRouter.post("/login", login);
adminRouter.get("/doctors", SelectDoctor);
adminRouter.get("/patients", SelectPatient);

module.exports = adminRouter;
