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
}

const InputRange = ({
  label,
  type,
  Min,
  Max,
  MinRange,
  MaxRange,
  step,
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
            setState({ min: e[0], max: e[1] });
          }}
        />
      </section>
    </>
  );
};

export default InputRange;
