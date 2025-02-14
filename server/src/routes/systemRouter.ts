import Router from "express";
import SystemController from "../controllers/systemController";

const systemRouter = Router();

systemRouter.get("/status/:systemID", SystemController.getSystemStatus);

export default systemRouter;
