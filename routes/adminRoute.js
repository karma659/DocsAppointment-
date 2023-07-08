const express = require("express");
const {signup, login, SelectDoctor, SelectPatient} = require("../controllers/adminController");
const { verifyToken, authorizeRoles } = require("../middlewares/authentication");

const adminRouter = express.Router();

adminRouter.post("/signup", signup);
adminRouter.post("/login", login);
adminRouter.get("/doctors",verifyToken ,authorizeRoles(["admin"]),SelectDoctor);
adminRouter.get("/patients",verifyToken ,authorizeRoles(["admin"]),SelectPatient);

module.exports = adminRouter;
