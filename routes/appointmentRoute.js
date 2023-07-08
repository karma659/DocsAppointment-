const express = require("express");
const {getall, create, update, deleteA, getSocketId} = require("../controllers/appointmentController");

const {authorizeRoles, verifyToken} = require("../middlewares/authentication");


const appointmentRouter = express.Router();

appointmentRouter.get("/", verifyToken, authorizeRoles(["admin"]), getall);
appointmentRouter.post("/create", verifyToken, create);
appointmentRouter.get("/video/:id",getSocketId);
appointmentRouter.patch("/update/:id", update);
appointmentRouter.delete("/delete/:id", deleteA);

module.exports = appointmentRouter;
