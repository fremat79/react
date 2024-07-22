import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function PlcVariable({ variable, dispatch, plcData }) {
  return (
    <ListGroup.Item
      onClick={() => dispatch({ type: "select", payLoad: variable })}
      as="li">
      <div>
        <div className="fw-bold">
          {variable.Name} (
          {plcData[variable.Name] === undefined ? "❓" : plcData[variable.Name]}
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
        </div>
      </div>
    </ListGroup.Item>
  );
}

export default PlcVariable;
