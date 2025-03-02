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
const database_1 = __importDefault(require("./database"));
class SystemModel {
    static checkIfSystemIdExists(systemID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.initialize();
                const response = yield database_1.default
                    .getPool()
                    .query("SELECT * FROM systems WHERE id = $1", [systemID]);
                if (response.rowCount > 0) {
                    return {
                        success: true,
                        idExists: true,
                    };
                }
                return {
                    success: true,
                    idExists: false,
                };
            }
            catch (err) {
                console.error("Error checking is systemId exists:", err);
                return {
                    success: false,
                    idExists: false,
                    error: err,
                };
            }
        });
    }
    static getSystemStatus(systemID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.initialize();
                const response = yield database_1.default
                    .getPool()
                    .query("SELECT * FROM system_data WHERE system_id = $1 ORDER BY checked_at DESC LIMIT 1", [systemID]);
                if (response.rowCount > 0) {
                    return {
                        success: true,
                        data: response.rows[0],
                    };
                }
                return {
                    success: false,
                };
            }
            catch (err) {
                console.error("Error grabbing system data:", err);
                return {
                    success: false,
                    error: err,
                };
            }
        });
    }
    static getSystemParameters(systemID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.initialize();
                const response = yield database_1.default
                    .getPool()
                    .query("SELECT * FROM system_parameters WHERE system_id = $1", [
                    systemID,
                ]);
                if (response.rowCount > 0) {
                    return {
                        success: true,
                        parameters: response.rows[0],
                    };
                }
                return {
                    success: false,
                };
            }
            catch (err) {
                console.error("Error grabbing system parameters:", err);
                return {
                    success: false,
                    error: err,
                };
            }
        });
    }
    static saveSystemParameters(systemID, minTemp, maxTemp, minTDS, maxTDS, lightingOnTime, lightingOffTime) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.initialize();
                const response = yield database_1.default
                    .getPool()
                    .query("UPDATE system_parameters SET min_temp = $1, max_temp = $2, min_tds = $3, max_tds = $4, lighting_on_time = $5, lighting_off_time = $6 WHERE system_id = $7", [
                    minTemp,
                    maxTemp,
                    minTDS,
                    maxTDS,
                    lightingOnTime,
                    lightingOffTime,
                    systemID,
                ]);
                console.log(response);
                if (response.rowCount > 0) {
                    return {
                        success: true,
                        parameters: response.rows[0],
                    };
                }
                return {
                    success: false,
                };
            }
            catch (err) {
                console.error("Error grabbing system parameters:", err);
                return {
                    success: false,
                    error: err,
                };
            }
        });
    }
    static saveSystemData(systemID, temp, tds, waterLevel, lighting) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.initialize();
                const response = yield database_1.default
                    .getPool()
                    .query("INSERT INTO system_data (system_id, temperature, tds, water_level, lighting, checked_at) VALUES ($1, $2, $3, $4, $5, NOW())", [systemID, temp, tds, waterLevel, lighting]);
                return {
                    success: true,
                };
            }
            catch (err) {
                console.error("Error saving system data:", err);
                return {
                    success: false,
                    error: err,
                };
            }
        });
    }
}
exports.default = SystemModel;
//# sourceMappingURL=systemModel.js.map