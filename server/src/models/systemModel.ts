import database from "./database";

interface System {
  ID: string;
  name: string;
}

interface SystemResponse {
  success: boolean | null;
  idExists?: boolean | null;
  error?: any;
}

class SystemModel {
  static async checkIfSystemIdExists(
    systemID: string
  ): Promise<SystemResponse> {
    try {
      await database.initialize();

      const response = await database
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
    } catch (err) {
      console.error("Error checking is systemId exists:", err);
      return {
        success: false,
        idExists: false,
        error: err,
      };
    }
  }
}

export default SystemModel;
