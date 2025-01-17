import { useState } from "react";
import Authorizer from "./components/Authorizer/Authorizer";
import Dashboard from "./components/Dashboard/Dashboard";
import { config } from "dotenv";

config();

function App() {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  //initial load need to send user to login page
  return (
    <>{user.id != "" ? <Dashboard /> : <Authorizer setUser={setUser} />}</>
  );
}

export default App;
