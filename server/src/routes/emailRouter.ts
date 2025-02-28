import Router from "express";
import EmailController from "../controllers/emailController";

const emailRouter = Router();

emailRouter.post("/sendPinToEmail/:email/:pin", EmailController.sendPinToEmail);

emailRouter.get("/alert/:systemID/:message", EmailController.sendAlertToEmail);

export default emailRouter;
