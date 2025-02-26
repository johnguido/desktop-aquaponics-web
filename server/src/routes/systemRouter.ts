import Router from "express";
import SystemController from "../controllers/systemController";

const systemRouter = Router();

systemRouter.get("/status/:systemID", SystemController.getSystemStatus);

systemRouter.get("/parameters/:systemID", SystemController.getSystemParameters);

systemRouter.post(
  "/parameters/save/:systemID/:minTemp/:maxTemp/:minTDS/:maxTDS/:lightingOnTime/:lightingOffTime",
  SystemController.saveSystemParameters
);

systemRouter.get(
  "/data/:systemID/:temp/:tds/:waterLevel/:lighting",
  SystemController.saveSystemData
);

export default systemRouter;
