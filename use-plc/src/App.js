import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/Main"; // Import the Main component
import Box from "./components/Box"; // Import the Box component

import "./index.css";
import { useReducer } from "react";
import PlcValue from "./components/PlcValue";
import PlcList from "./components/PlcList";

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
  refreshTimeStamp: Date.now(),
};

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "refresh":
      newState = { ...state, refreshTimeStamp: Date.now() };
      break;
    case "select":
      newState = { ...state, selectedVariable: action.payLoad };
      break;
    default:
      throw new Error("Invalid action type");
  }
  return newState;
}

async function handleWriteVariable(plcVariable, value) {
  const variable = `${plcVariable.Name}:${plcVariable.DB},${plcVariable.Type}${plcVariable.Address}`;

  console.log("Writing variable", variable, "with value", value);

  // Example object to post
  const data = {
    variable: variable,
    value: value,
  };

  // Create a fetch request posting the object
  const response = await fetch("http://localhost:3001/api/writeVariable", {
    method: "POST", // Set the request method to POST
    headers: {
      "Content-Type": "application/json", // Indicate JSON payload
    },
    body: JSON.stringify(data), // Stringify and include the object in the request body
  });
  const json = await response.json(); // Parse JSON response}
}

export default function App() {
  const [{ variables, selectedVariable, refreshTimeStamp }, dispatch] =
    useReducer(reducer, initialState);

  return (
    <Main>
      <Box>
        <PlcList
          refreshTimeStamp={refreshTimeStamp}
          dispatch={dispatch}
          variables={variables}
        />
      </Box>
      <Box>
        <PlcValue
          onWriteVariable={handleWriteVariable}
          dispatch={dispatch}
          variable={selectedVariable}
        />
      </Box>
    </Main>
  );
}
