import Main from "./components/Main"; // Import the Main component
import Box from "./components/Box"; // Import the Box component
import PlcInfo from "./components/PlcInfo"; // Import the PlcInfo component
import PlcVariableContainer from "./components/PlcVariableContainer"; // Import the PlcVariableContainer component
import "./index.css";
import { useReducer } from "react";
import PlcValue from "./components/PlcValue";

const initialState = {
  plcInfo: {
    port: 102, // Common port for Siemens PLCs
    host: "10.64.0.93", // Replace with your PLC's IP address
    rack: 0, // Rack number (for S7-300/400)
    slot: 2, // Slot number (for S7-300/400)
  },
  plcServer: null,
  variables: [
    {
      Name: "StatoPosLoad",
      DB: "DB1067",
      Type: "INT",
      Address: 0,
    },
    {
      Name: "IDStatoPosLoad",
      DB: "DB1067",
      Type: "INT",
      Address: 2,
    },
    {
      Name: "StatoForno",
      DB: "DB1067",
      Type: "INT",
      Address: 4,
    },
    {
      Name: "IDStatoForno",
      DB: "DB1067",
      Type: "INT",
      Address: 6,
    },
    {
      Name: "TzZ1Bruc",
      DB: "DB1067",
      Type: "REAL",
      Address: 8,
    },
    {
      Name: "TzZ1Vent",
      DB: "DB1067",
      Type: "REAL",
      Address: 12,
    },
    {
      Name: "TzZ1Tetto",
      DB: "DB1067",
      Type: "REAL",
      Address: 16,
    },
    {
      Name: "SPZ1",
      DB: "DB1067",
      Type: "REAL",
      Address: 20,
    },
    {
      Name: "TzZ2Bruc",
      DB: "DB1067",
      Type: "REAL",
      Address: 24,
    },
    {
      Name: "TzZ2Vent",
      DB: "DB1067",
      Type: "REAL",
      Address: 28,
    },
    {
      Name: "TzZ2Tetto",
      DB: "DB1067",
      Type: "REAL",
      Address: 32,
    },
    {
      Name: "SPZ2",
      DB: "DB1067",
      Type: "REAL",
      Address: 36,
    },
    {
      Name: "M3Gas",
      DB: "DB1067",
      Type: "REAL",
      Address: 40,
    },
    {
      Name: "IDTrattReq",
      DB: "DB1067",
      Type: "INT",
      Address: 44,
    },
    {
      Name: "FlagReq",
      DB: "DB1067",
      Type: "INT",
      Address: 46,
    },
  ],
  selectedVariable: null,
};

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "connect":
      newState = { ...state };
      break;
    case "disconnect":
      newState = { ...state };
      break;
    case "read":
      console.log("Read", action.payload);
      newState = { ...state, selectedVariable: action.payload };
      break;
    default:
      throw new Error("Invalid action type");
  }
  return newState;
}

function App() {
  const [{ plcInfo, variables, selectedVariable }, dispatch] = useReducer(
    reducer,
    initialState
  );

  console.log("log variables", variables);
  console.log("log selectedVariable", selectedVariable);

  return (
    <Main>
      <Box>
        <PlcInfo info={plcInfo} />
        <PlcVariableContainer dispatch={dispatch} variables={variables} />
      </Box>
      <Box>
        <PlcValue dispatch={dispatch} variable={selectedVariable} />
      </Box>
    </Main>
  );
}

export default App;
