import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/Main"; // Import the Main component
import Box from "./components/Box"; // Import the Box component

import "./index.css";
import { useReducer, useState } from "react";
import { useDropzone } from "react-dropzone";
import PlcValue from "./components/PlcValue";
import PlcList from "./components/PlcList";
import PlcInfo from "./components/PlcInfo";
import { Toast, ToastContainer } from "react-bootstrap";
import { faBriefcaseClock } from "@fortawesome/free-solid-svg-icons";

function downloadAsJson() {
  const data = JSON.stringify(initialState);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "plcConfig.json";
  link.click();
  URL.revokeObjectURL(url);
}

// const initialState = {
//   plcInfo: {
//     port: 102, // Common port for Siemens PLCs
//     host: "10.64.0.93", // Replace with your PLC's IP address
//     rack: 0, // Rack number (for S7-300/400)
//     slot: 2, // Slot number (for S7-300/400)
//   },
//   plcServer: null,
//   variables: [
//     {
//       Name: "StatoPosLoad",
//       DB: "DB1067",
//       Type: "INT",
//       Address: 0,
//       DefaultValues: [
//         { Name: "Libera", Value: 1 },
//         { Name: "Occupata", Value: 2 },
//         { Name: "Occupata da evacuare", Value: 3 },
//         { Name: "Occcupata Prep.carico", Value: 4 },
//         { Name: "Occupata Prep carico conclusa", Value: 5 },
//       ],
//     },
//     {
//       Name: "IDStatoPosLoad",
//       DB: "DB1067",
//       Type: "INT",
//       Address: 2,
//       DefaultValues: [],
//     },
//     {
//       Name: "StatoForno",
//       DB: "DB1067",
//       Type: "INT",
//       Address: 4,
//       DefaultValues: [
//         { Name: "Pronto", Value: 1 },
//         { Name: "Pre-Riscaldo-On", Value: 2 },
//         { Name: "Trattamento-On", Value: 3 },
//         { Name: "Ciclo-Terminato-Bene", Value: 4 },
//         { Name: "Cilco-Abortito", Value: 5 },
//         { Name: "Ciclo-Scarico-InCorso", Value: 6 },
//       ],
//     },
//     {
//       Name: "IDTrattForno",
//       DB: "DB1067",
//       Type: "INT",
//       Address: 6,
//       DefaultValues: [],
//     },
//     {
//       Name: "TzZ1Bruc",
//       DB: "DB1067",
//       Type: "REAL",
//       Address: 8,
//       DefaultValues: [],
//     },
//     {
//       Name: "TzZ1Vent",
//       DB: "DB1067",
//       Type: "REAL",
//       Address: 12,
//       DefaultValues: [],
//     },
//     {
//       Name: "TzZ1Tetto",
//       DB: "DB1067",
//       Type: "REAL",
//       Address: 16,
//       DefaultValues: [],
//     },
//     {
//       Name: "SPZ1",
//       DB: "DB1067",
//       Type: "REAL",
//       Address: 20,
//       DefaultValues: [],
//     },
//     {
//       Name: "TzZ2Bruc",
//       DB: "DB1067",
//       Type: "REAL",
//       Address: 24,
//       DefaultValues: [],
//     },
//     {
//       Name: "TzZ2Vent",
//       DB: "DB1067",
//       Type: "REAL",
//       Address: 28,
//       DefaultValues: [],
//     },
//     {
//       Name: "TzZ2Tetto",
//       DB: "DB1067",
//       Type: "REAL",
//       Address: 32,
//       DefaultValues: [],
//     },
//     {
//       Name: "SPZ2",
//       DB: "DB1067",
//       Type: "REAL",
//       Address: 36,
//       DefaultValues: [],
//     },
//     {
//       Name: "M3Gas",
//       DB: "DB1067",
//       Type: "REAL",
//       Address: 40,
//       DefaultValues: [],
//     },
//     {
//       Name: "IDTrattReq",
//       DB: "DB1067",
//       Type: "INT",
//       Address: 44,
//       DefaultValues: [],
//     },
//     {
//       Name: "FlagReq",
//       DB: "DB1067",
//       Type: "INT",
//       Address: 46,
//       DefaultValues: [],
//     },
//   ],
//   selectedVariable: null,
//   refreshTimeStamp: Date.now(),
//   editMode: "",
//   toast: {
//     show: false,
//     message: "",
//     bg: "dark",
//   },
// };

const initialState = {
  plcInfo: { host: "0" },
  plcServer: null,
  variables: [],
  selectedVariable: null,
  refreshTimeStamp: Date.now(),
  editMode: "",
  toast: {
    show: false,
    message: "",
    bg: "dark",
  },
};

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "showErrorToast":
      newState = {
        ...state,
        toast: {
          ...state.toast,
          show: true,
          bg: "danger",
          message: action.payload,
        },
      };
      break;
    case "showInfoToast":
      newState = {
        ...state,
        toast: {
          ...state.toast,
          show: true,
          bg: "success",
          message: action.payload,
        },
      };
      break;
    case "hideToast":
      newState = {
        ...state,
        toast: { ...state.toast, show: false, message: "" },
      };
      break;
    case "setState":
      newState = action.payload;
      break;
    case "toggleEditPlcInfo":
      newState = {
        ...state,
        editMode: state.editMode === "" ? "editPlcInfo" : "",
      };
      break;
    case "toggleAddVariable":
      newState = {
        ...state,
        editMode: state.editMode === "" ? "addVariable" : "",
      };
      break;
    case "addVariable":
      newState = {
        ...state,
        variables: [...state.variables, action.payLoad],
        editMode: "",
      };
      break;
    case "updatePlcInfo":
      newState = { ...state, plcInfo: action.payLoad };
      break;
    case "refresh":
      newState = { ...state, refreshTimeStamp: Date.now() };
      break;
    case "select":
      newState = { ...state, selectedVariable: action.payLoad };
      break;
    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
  return newState;
}

async function handleWriteVariable(dispatch, plcVariable, plcInfo, value) {
  const variable = `${plcVariable.Name}:${plcVariable.DB},${plcVariable.Type}${plcVariable.Address}`;

  const data = {
    connectionInfo: plcInfo,
    variable: variable,
    value: value,
  };

  try {
    const response = await fetch("http://localhost:3001/api/writeVariable", {
      method: "POST", // Set the request method to POST
      headers: {
        "Content-Type": "application/json", // Indicate JSON payload
      },
      body: JSON.stringify(data), // Stringify and include the object in the request body
    });
    if (response.status === 500) {
      dispatch({
        type: "showErrorToast",
        payload: "😥️ Error writing variable",
      });
    }
  } catch (err) {
    dispatch({
      type: "showErrorToast",
      payload: `😥️ Error writing variable: ${err}`,
    });
  }
}

function App() {
  const [
    {
      toast: { show: showToast },
      toast: { message: toastMessage },
      toast: { bg: toastType },
      variables,
      plcInfo,
      selectedVariable,
      refreshTimeStamp,
      editMode,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  function onDrop(acceptedFiles) {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const fileContent = e.target.result;
        const parsedData = JSON.parse(fileContent);
        dispatch({ type: "setState", payload: parsedData });
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };
    reader.readAsText(file);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Main>
        <Box>
          <div
            {...getRootProps()}
            style={{
              border: isDragActive ? "2px dashed #000" : "2px solid #ccc",
              padding: "20px",
              textAlign: "center",
            }}>
            <input {...getInputProps()} />
            {isDragActive
              ? "Drop the file here..."
              : "Drag and drop a file here, or click to select a file"}
          </div>

          <PlcInfo editMode={editMode} info={plcInfo} dispatch={dispatch} />
          <PlcList
            refreshTimeStamp={refreshTimeStamp}
            dispatch={dispatch}
            info={plcInfo}
            variables={variables}
          />
        </Box>
        <Box>
          <PlcValue
            onWriteVariable={handleWriteVariable}
            info={plcInfo}
            dispatch={dispatch}
            variable={selectedVariable}
          />
        </Box>
        <ToastContainer position="bottom-center">
          <Toast
            autohide
            bg={toastType}
            show={showToast}
            onClose={() => {
              dispatch({ type: "hideToast" });
            }}
            onExit={() => dispatch({ type: "hideToast" })}>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Main>
    </>
  );
}

export { App, downloadAsJson };
