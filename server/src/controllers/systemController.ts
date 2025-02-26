import { time } from "console";
import SystemModel from "../models/systemModel";

class SystemController {
  static async getSystemStatus(req, res): Promise<void> {
    const { systemID } = req.params;

    const response = await SystemModel.getSystemStatus(systemID);

    res.send({ success: response.success, data: response.data });
  }

  static async getSystemParameters(req, res): Promise<void> {
    const { systemID } = req.params;

    const response = await SystemModel.getSystemParameters(systemID);

    res.send({ success: response.success, parameters: response.parameters });
  }

  static async saveSystemParameters(req, res): Promise<void> {
    const {
      systemID,
      minTemp,
      maxTemp,
      minTDS,
      maxTDS,
      lightingOnTime,
      lightingOffTime,
    } = req.params;

    const response = await SystemModel.saveSystemParameters(
      systemID,
      minTemp,
      maxTemp,
      minTDS,
      maxTDS,
      lightingOnTime,
      lightingOffTime
    );

    res.send({ success: response.success });
  }

  static async saveSystemData(req, res): Promise<void> {
    const { systemID, temp, tds, waterLevel, lighting } = req.params;

    const response = await SystemModel.saveSystemData(
      systemID,
      temp,
      tds,
      waterLevel,
      lighting
    );

    if (response.success) {
      const response = await SystemModel.getSystemParameters(systemID);

      if (response.success) {
        res.send({
          success: true,
          message:
            "Successfully saved system data and grabbed system parameters",
          parameters: response.parameters,
        });
      } else {
        res.send({
          success: true,
          message:
            "Successfully saved system data.  Unable to grab system parameters",
        });
      }
    } else {
      res.send({
        success: false,
        message: "Unable to save system data",
      });
    }
  }
}

export default SystemController;
