"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const systemModel_1 = __importDefault(require("../models/systemModel"));
class SystemController {
    static getSystemStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { systemID } = req.params;
            const response = yield systemModel_1.default.getSystemStatus(systemID);
            res.send({ success: response.success, data: response.data });
        });
    }
    static getSystemParameters(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { systemID } = req.params;
            const response = yield systemModel_1.default.getSystemParameters(systemID);
            res.send({ success: response.success, parameters: response.parameters });
        });
    }
    static saveSystemParameters(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { systemID, minTemp, maxTemp, minTDS, maxTDS, lightingOnTime, lightingOffTime, } = req.params;
            const response = yield systemModel_1.default.saveSystemParameters(systemID, minTemp, maxTemp, minTDS, maxTDS, lightingOnTime, lightingOffTime);
            res.send({ success: response.success });
        });
    }
    static saveSystemData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { systemID, temp, tds, waterLevel, lighting } = req.params;
            const response = yield systemModel_1.default.saveSystemData(systemID, temp, tds, waterLevel, lighting);
            if (response.success) {
                const response = yield systemModel_1.default.getSystemParameters(systemID);
                if (response.success) {
                    res.send({
                        success: true,
                        message: "Successfully saved system data and grabbed system parameters",
                        parameters: response.parameters,
                    });
                }
                else {
                    res.send({
                        success: true,
                        message: "Successfully saved system data.  Unable to grab system parameters",
                    });
                }
            }
            else {
                res.send({
                    success: false,
                    message: "Unable to save system data",
                });
            }
        });
    }
}
exports.default = SystemController;
