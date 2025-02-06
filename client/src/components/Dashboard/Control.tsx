//import { useState } from "react";
import styles from "./Control.module.css";
import InputRange from "./InputRange";

const Control = () => {
  /*
  const [state, setState] = useState({
    minTemp: 70,
    maxTemp: 80,
    minTDS: 200,
    maxTDS: 350,
    lightOnTime: "",
    lightOffTime: "",
    lightOverrideOn: false,
    lihgtOverrideOff: false,
  });
  */

  const onSaveClicked = () => {
    console.log("SAVED CHANGES");
  };

  return (
    <>
      <main className={styles.main}>
        <h1>Control Panel</h1>
        <section className={styles.section}>
          <InputRange
            label={"Water Temp"}
            type={"temp"}
            Min={75}
            Max={80}
            MinRange={60}
            MaxRange={90}
            step={0.5}
          ></InputRange>
          <InputRange
            label={"TDS"}
            type={"TDS"}
            Min={200}
            Max={250}
            MinRange={100}
            MaxRange={600}
            step={5}
          ></InputRange>
          <fieldset className={styles.lightingRangeSet}>
            <legend>Lighting Range Set</legend>
            <label htmlFor="onTime">On Time</label>
            <input type="time" id="onTime" />
            <label htmlFor="offTime">Off Time</label>
            <input type="time" id="offTime" />
          </fieldset>
          <fieldset className={styles.lightingOverride}>
            <legend>Lighting Override</legend>
            <input type="radio" id="on" name="lighting" value="On" />
            <label htmlFor="on">On</label>
            <input type="radio" id="off" name="lighting" value="Off" />
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
