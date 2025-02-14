import SystemModel from "../models/systemModel";

class SystemController {
  static async getSystemStatus(req, res): Promise<void> {
    const { systemID } = req.params;

    const response = await SystemModel.getSystemStatus(systemID);

    res.send({ success: response.success, data: response.data });
  }
}

export default SystemController;
