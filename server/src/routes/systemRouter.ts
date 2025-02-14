import Router from "express";
import SystemController from "../controllers/systemController";

const systemRouter = Router();

systemRouter.get("/status/:systemID", SystemController.getSystemStatus);

systemRouter.get("/parameters/:systemID", SystemController.getSystemParameters);

export default systemRouter;
