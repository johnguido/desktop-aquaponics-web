import database from "./database";

interface System {
  ID: string;
  name: string;
}

interface SystemData {
  system_id: string;
  temperature: string;
  tds: string;
  water_level: boolean;
  checked_at: string;
}

interface SystemParameters {
  system_id: string;
  min_temp: string;
  max_temp: string;
  min_tds: string;
  max_tds: string;
  lighting_on_time: string;
  lighting_off_time: string;
  updated_at: string;
}

interface SystemResponse {
  success: boolean | null;
  idExists?: boolean | null;
  data?: SystemData;
  parameters?: SystemParameters;
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

  static async getSystemStatus(systemID: string): Promise<SystemResponse> {
    try {
      await database.initialize();

      const response = await database
        .getPool()
        .query("SELECT * FROM system_data WHERE system_id = $1", [systemID]);

      if (response.rowCount > 0) {
        return {
          success: true,
          data: response.rows[0],
        };
      }

      return {
        success: false,
      };
    } catch (err) {
      console.error("Error grabbing system data:", err);
      return {
        success: false,
        error: err,
      };
    }
  }

  static async getSystemParameters(systemID: string): Promise<SystemResponse> {
    try {
      await database.initialize();

      const response = await database
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
    } catch (err) {
      console.error("Error grabbing system parameters:", err);
      return {
        success: false,
        error: err,
      };
    }
  }

  static async saveSystemParameters(
    systemID: string,
    minTemp: number,
    maxTemp: number,
    minTDS: number,
    maxTDS: number,
    lightingOnTime: string,
    lightingOffTime: string
  ): Promise<SystemResponse> {
    try {
      await database.initialize();

      const response = await database
        .getPool()
        .query(
          "UPDATE system_parameters SET min_temp = $1, max_temp = $2, min_tds = $3, max_tds = $4, lighting_on_time = $5, lighting_off_time = $6 WHERE system_id = $7",
          [
            minTemp,
            maxTemp,
            minTDS,
            maxTDS,
            lightingOnTime,
            lightingOffTime,
            systemID,
          ]
        );

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
    } catch (err) {
      console.error("Error grabbing system parameters:", err);
      return {
        success: false,
        error: err,
      };
    }
  }
}

export default SystemModel;
