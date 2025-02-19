import styles from "./Dashboard.module.css";
import Status from "./Status";
import Control from "./Control";

interface DashboardProps {
  systemID: string;
}

const Dashboard = ({ systemID }: DashboardProps) => {
  //two sub components System Status and Control Panel
  //Make "Save" blue initially and go to "Saved" green on save
  //When anythign changes within control panel after change back to "Save" blue

  //on initial load in all data / parameter info pertaining to system id
  //pass data into status
  //pass parameter info into control

  return (
    <>
      <main className={styles.dashboard}>
        <Status systemID={systemID}></Status>
        <Control systemID={systemID}></Control>
      </main>
    </>
  );
};

export default Dashboard;
