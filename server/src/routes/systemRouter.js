"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const systemController_1 = __importDefault(require("../controllers/systemController"));
const systemRouter = (0, express_1.default)();
systemRouter.get("/status/:systemID", systemController_1.default.getSystemStatus);
systemRouter.get("/parameters/:systemID", systemController_1.default.getSystemParameters);
systemRouter.post("/parameters/save/:systemID/:minTemp/:maxTemp/:minTDS/:maxTDS/:lightingOnTime/:lightingOffTime", systemController_1.default.saveSystemParameters);
systemRouter.get("/data/:systemID/:temp/:tds/:waterLevel/:lighting", systemController_1.default.saveSystemData);
exports.default = systemRouter;
