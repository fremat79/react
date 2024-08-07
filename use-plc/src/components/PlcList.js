import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";
import PlcVariable from "./PlcVariable";

function PlcList({ info, refreshTimeStamp, variables, dispatch }) {
  const [plcData, setPLCData] = useState([]);

  useEffect(() => {
    async function readVariables() {
      //const variable = `${plcVariable.Name}:${plcVariable.DB},${plcVariable.Type}${plcVariable.Address}`;

      if (variables.length === 0) return;

      const data = {
        plcInfo: info,
        variables: variables,
      };

      try {
        const response = await fetch(
          "http://localhost:3001/api/readVariablesNew",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const json = await response.json();
        setPLCData(json.data);
      } catch (err) {
        dispatch({
          type: "showErrorToast",
          payload: `😥️ Error reading variables: ${err.message}`,
        });
      }

      // try {
      //   const response = await fetch(`http://localhost:3001/api/readVariables`);
      //   const data = await response.json();
      //   setPLCData(data.data);
      // } catch (error) {
      //   //console.error("Error reading:", error);
      // }
    }
    readVariables();
  }, [refreshTimeStamp]);

  return (
    <ListGroup as="ol">
      {variables.map((variable) => (
        <PlcVariable
          key={variable.Name}
          variable={variable}
          dispatch={dispatch}
          plcData={plcData}
        />
      ))}
    </ListGroup>
  );
}

export default PlcList;
