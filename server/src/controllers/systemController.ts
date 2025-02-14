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
}

export default SystemController;
