import { useState } from "react";
import Authorizer from "./components/Authorizer/Authorizer";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    systemID: "",
  });

  //return <Dashboard></Dashboard>;

  //initial load need to send user to login page
  return (
    <>
      {user.id != "" ? (
        <Dashboard systemID={user.systemID} />
      ) : (
        <Authorizer setUser={setUser} />
      )}
    </>
  );
}

export default App;
