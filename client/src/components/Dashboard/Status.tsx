import styles from "./Status.module.css";

const Status = () => {
  return (
    <>
      <main className={styles.main}>
        <h1>System Status</h1>
        <section className={styles.section}>
          <div>
            <label htmlFor="waterTemp">Water Temp</label>
            <input type="text" id="waterTemp" value="76 °F" readOnly />
          </div>
          <div>
            <label htmlFor="waterLevel">Water Level</label>
            <input type="text" id="waterLevel" value="Good" readOnly />
          </div>
          <div>
            <label htmlFor="TDS">TDS</label>
            <input type="text" id="TDS" value="500 ppm" readOnly />
          </div>
          <div>
            <label htmlFor="lighting">Lighting</label>
            <input type="text" id="lighting" value="On" readOnly />
          </div>
        </section>
      </main>
    </>
  );
};

export default Status;
