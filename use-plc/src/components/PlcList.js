import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

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
    <>
      <Accordion className="plcInfo" defaultActiveKey="0" alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Plc info</Accordion.Header>
          <Accordion.Body>
            <div></div>
            <Button
              onClick={() => dispatch({ type: "refresh" })}
              variant="success">
              Read all
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <ListGroup as="ol">
        {variables.map((variable) => (
          <ListGroup.Item
            onClick={() => dispatch({ type: "select", payLoad: variable })}
            as="li"
            key={variable.Name}>
            <div>
              <div className="fw-bold">
                {variable.Name} (
                {plcData[variable.Name] === undefined
                  ? "❓"
                  : plcData[variable.Name]}
                )
              </div>
              <div className="plcInfoContainer">
                <ul>
                  <li>
                    <div className="plcVariableInfo">
                      <FontAwesomeIcon size="1x" icon={faMicrochip} />
                      {variable.DB}
                    </div>
                  </li>
                  <li>
                    <div className="plcVariableInfo">
                      <FontAwesomeIcon size="1x" icon={faMicrochip} />
                      {variable.Type}
                    </div>
                  </li>
                  <li>
                    <div className="plcVariableInfo">
                      <FontAwesomeIcon size="1x" icon={faMicrochip} />
                      {variable.Address}
                    </div>
                  </li>
                </ul>

                <Button variant="danger">Write</Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default PlcList;
