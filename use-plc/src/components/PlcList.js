import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import { useEffect, useState } from "react";
import PlcVariable from "./PlcVariable";

function PlcList({ refreshTimeStamp, variables, dispatch }) {
  const [plcData, setPLCData] = useState([]);

  useEffect(() => {
    async function readVariables() {
      //const variable = `${plcVariable.Name}:${plcVariable.DB},${plcVariable.Type}${plcVariable.Address}`;
      console.log("fetching data from PLC");
      try {
        const response = await fetch(`http://localhost:3001/api/readVariables`);
        const data = await response.json();
        setPLCData(data.data);
      } catch (error) {
        console.error("Error reading:", error);
      }
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
