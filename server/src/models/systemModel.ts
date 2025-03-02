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
        .query(
          "SELECT * FROM system_data WHERE system_id = $1 ORDER BY checked_at DESC LIMIT 1",
          [systemID]
        );

      console.log("yupppp");
      console.log(response.rows);

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

  static async saveSystemData(
    systemID: string,
    temp: number,
    tds: number,
    waterLevel: number,
    lighting: number
  ): Promise<SystemResponse> {
    try {
      await database.initialize();

      const response = await database
        .getPool()
        .query(
          "INSERT INTO system_data (system_id, temperature, tds, water_level, lighting, checked_at) VALUES ($1, $2, $3, $4, $5, NOW())",
          [systemID, temp, tds, waterLevel, lighting]
        );

      return {
        success: true,
      };
    } catch (err) {
      console.error("Error saving system data:", err);
      return {
        success: false,
        error: err,
      };
    }
  }
}

export default SystemModel;
