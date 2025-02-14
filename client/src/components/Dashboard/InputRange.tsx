import { useState, useEffect } from "react";
import styles from "./InputRange.module.css";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

interface InputRangeProp {
  label: string;
  type: string;
  Min: number;
  Max: number;
  MinRange: number;
  MaxRange: number;
  step: number;
  sharedState: {
    minTemp: number;
    maxTemp: number;
    minTDS: number;
    maxTDS: number;
    lightOnTime: string;
    lightOffTime: string;
    lightOverrideOn: boolean;
    lightOverrideOff: boolean;
  };
  setSharedState: React.Dispatch<
    React.SetStateAction<{
      minTemp: number;
      maxTemp: number;
      minTDS: number;
      maxTDS: number;
      lightOnTime: string;
      lightOffTime: string;
      lightOverrideOn: boolean;
      lightOverrideOff: boolean;
    }>
  >;
}

const InputRange = ({
  label,
  type,
  Min,
  Max,
  MinRange,
  MaxRange,
  step,
  sharedState,
  setSharedState,
}: InputRangeProp) => {
  const [state, setState] = useState({
    min: Min,
    max: Max,
  });

  useEffect(() => {
    setState({ min: Min, max: Max });
  }, [Min, Max]);

  return (
    <>
      <section className={styles.section}>
        <h3>{label}</h3>
        <div className={styles.inputContainer}>
          <div>
            <label htmlFor={"min" + type}>Min</label>
            <input type="text" id={"min" + type} value={state.min} readOnly />
          </div>
          <div>
            <label htmlFor={"max" + type}>Max</label>
            <input type="text" id={"max" + type} value={state.max} readOnly />
          </div>
        </div>
        <RangeSlider
          min={MinRange}
          max={MaxRange}
          defaultValue={[state.min, state.max]}
          step={step}
          onInput={(e) => {
            if (type == "temp") {
              setSharedState({ ...sharedState, minTemp: e[0], maxTemp: e[1] });
            } else {
              setSharedState({ ...sharedState, minTDS: e[0], maxTDS: e[1] });
            }
            setState({ min: e[0], max: e[1] });
          }}
        />
      </section>
    </>
  );
};

export default InputRange;
