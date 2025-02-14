import styles from "./Status.module.css";
import { useState, useEffect } from "react";
import DashService from "./DashService";

interface StatusProps {
  systemID: string;
}

const Status = ({ systemID }: StatusProps) => {
  const [state, setState] = useState({
    waterTemp: "",
    waterLevel: true,
    tds: "",
    lighting: true,
  });

  const fetchSystemStatus = async () => {
    const response = await DashService.getSystemStatus(systemID);

    if (response.success) {
      setState({
        waterTemp: response.data.temperature,
        waterLevel: response.data.water_level,
        tds: response.data.tds,
        lighting: response.data.lighting,
      });
    }
  };

  useEffect(() => {
    fetchSystemStatus();

    const interval = setInterval(() => {
      fetchSystemStatus();
    }, 5000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main className={styles.main}>
        <h1>System Status</h1>
        <section className={styles.section}>
          <div>
            <label htmlFor="waterTemp">Water Temp</label>
            <input
              type="text"
              id="waterTemp"
              value={state.waterTemp}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="waterLevel">Water Level</label>
            <input
              type="text"
              id="waterLevel"
              value={state.waterLevel ? "Good" : "Bad"}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="TDS">TDS</label>
            <input type="text" id="TDS" value={state.tds} readOnly />
          </div>
          <div>
            <label htmlFor="lighting">Lighting</label>
            <input
              type="text"
              id="lighting"
              value={state.lighting ? "On" : "Off"}
              readOnly
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Status;
