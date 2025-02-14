import axios from "axios";

class DashService {
  private static baseURL: string = "http://localhost:3000";

  static async getSystemStatus(systemID: string) {
    try {
      const url = `${this.baseURL}/system/status/${systemID}`;

      const response = await axios.get(url);

      return { success: response.data.success, data: response.data.data };
    } catch (error) {
      console.error("Error signing user in: ", error);
      return { user: null };
    }
  }

  static async getSystemParameters(systemID: string) {
    try {
      const url = `${this.baseURL}/system/parameters/${systemID}`;

      const response = await axios.get(url);

      return {
        success: response.data.success,
        parameters: response.data.parameters,
      };
    } catch (error) {
      console.error("Error signing user in: ", error);
      return { user: null };
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
  ) {
    try {
      const url = `${this.baseURL}/system/parameters/save/${systemID}/${minTemp}/${maxTemp}/${minTDS}/${maxTDS}/${lightingOnTime}/${lightingOffTime}`;

      const response = await axios.post(url);

      return {
        success: response.data.success,
      };
    } catch (error) {
      console.error("Error signing user in: ", error);
      return { user: null };
    }
  }
}

export default DashService;
