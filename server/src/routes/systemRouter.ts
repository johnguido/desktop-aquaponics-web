import Router from "express";
import SystemController from "../controllers/systemController";

const systemRouter = Router();

systemRouter.get("/status/:systemID", SystemController.getSystemStatus);

systemRouter.get("/parameters/:systemID", SystemController.getSystemParameters);

systemRouter.post(
  "/parameters/save/:systemID/:minTemp/:maxTemp/:minTDS/:maxTDS/:lightingOnTime/:lightingOffTime",
  SystemController.saveSystemParameters
);

export default systemRouter;
