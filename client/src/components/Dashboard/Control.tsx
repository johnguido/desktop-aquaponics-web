import { useState, useEffect } from "react";
import styles from "./Control.module.css";
import InputRange from "./InputRange";
import DashService from "./DashService";

interface ControlProps {
  systemID: string;
}

const Control = ({ systemID }: ControlProps) => {
  const [state, setState] = useState({
    minTemp: 70,
    maxTemp: 80,
    minTDS: 200,
    maxTDS: 350,
    lightOnTime: "",
    lightOffTime: "",
    lightOverrideOn: false,
    lightOverrideOff: false,
  });

  const fetchSystemParameters = async () => {
    const response = await DashService.getSystemParameters(systemID);

    setState({
      ...state,
      minTemp: response.parameters.min_temp,
      maxTemp: response.parameters.max_temp,
      minTDS: response.parameters.min_tds,
      maxTDS: response.parameters.max_tds,
      lightOnTime: response.parameters.lighting_on_time,
      lightOffTime: response.parameters.lighting_off_time,
    });
  };

  useEffect(() => {
    fetchSystemParameters();
  }, []);

  const onSaveClicked = async () => {
    //TODO handle lighting override
    //have table that says to override lighting on / off per system ID
    //if either are toggled we will send the proper request up and set "processed" to null
    //ESP32 will pull only null processed lighting override requests and set processed to true after handling!

    const response = await DashService.saveSystemParameters(
      systemID,
      state.minTemp,
      state.maxTemp,
      state.minTDS,
      state.maxTDS,
      state.lightOnTime,
      state.lightOffTime
    );
  };

  const setLightingOverrideOn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, lightOverrideOn: e.target.checked });
  };

  const setLightingOverrideOff = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, lightOverrideOff: e.target.checked });
  };

  const setLightingOnTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, lightOnTime: e.target.value + ":00" });
  };

  const setLightingOffTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, lightOffTime: e.target.value + ":00" });
  };

  return (
    <>
      <main className={styles.main}>
        <h1>Control Panel</h1>
        <section className={styles.section}>
          <InputRange
            label={"Water Temp"}
            type={"temp"}
            Min={state.minTemp}
            Max={state.maxTemp}
            MinRange={60}
            MaxRange={90}
            step={0.5}
            sharedState={state}
            setSharedState={setState}
          ></InputRange>
          <InputRange
            label={"TDS"}
            type={"TDS"}
            Min={state.minTDS}
            Max={state.maxTDS}
            MinRange={100}
            MaxRange={600}
            step={5}
            sharedState={state}
            setSharedState={setState}
          ></InputRange>
          <fieldset className={styles.lightingRangeSet}>
            <legend>Lighting Range Set</legend>
            <label htmlFor="onTime">On Time</label>
            <input
              type="time"
              id="onTime"
              defaultValue={state.lightOnTime}
              onChange={(e) => setLightingOnTime(e)}
            />
            <label htmlFor="offTime">Off Time</label>
            <input
              type="time"
              id="offTime"
              defaultValue={state.lightOffTime}
              onChange={(e) => setLightingOffTime(e)}
            />
          </fieldset>
          <fieldset className={styles.lightingOverride}>
            <legend>Lighting Override</legend>
            <input
              type="radio"
              id="on"
              name="lighting"
              value="On"
              onChange={(e) => setLightingOverrideOn(e)}
            />
            <label htmlFor="on">On</label>
            <input
              type="radio"
              id="off"
              name="lighting"
              value="Off"
              onChange={(e) => setLightingOverrideOff(e)}
            />
            <label htmlFor="off">Off</label>
          </fieldset>
          <button className={styles.save} onClick={onSaveClicked}>
            Save Changes
          </button>
        </section>
      </main>
    </>
  );
};

export default Control;
