const express = require("express");
const {
   getall,
   create,
   update,
   deleteA,
   getSocketId
} = require("../controllers/appointmentController");

const {authorizeRoles, verifyToken} = require("../middlewares/authentication");

const appointmentRouter = express.Router();

appointmentRouter.get("/", verifyToken, authorizeRoles(["admin"]), getall);
appointmentRouter.post("/create", verifyToken, authorizeRoles(["patient", "admin"]), create);
appointmentRouter.get("/video/:id", getSocketId);
appointmentRouter.patch("/update/:id", verifyToken, authorizeRoles(["patient", "admin"]), update);
appointmentRouter.delete(
   "/delete/:id",
   verifyToken,
   authorizeRoles(["patient", "admin", "doctor"]),
   deleteA
);

module.exports = appointmentRouter;
