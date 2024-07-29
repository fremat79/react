import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Button, Form, Row, Col, Stack } from "react-bootstrap";

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
          <Stack direction="horizontal" gap={2}>
            <div className="plcVariableInfo">
              <FontAwesomeIcon size="1x" icon={faMicrochip} />
              {variable.DB}
            </div>
            <div className="plcVariableInfo">
              <FontAwesomeIcon size="1x" icon={faMicrochip} />
              {variable.Type}
            </div>
            <div className="plcVariableInfo">
              <FontAwesomeIcon size="1x" icon={faMicrochip} />
              {variable.Address}
            </div>
          </Stack>
        </div>
      </div>
    </ListGroup.Item>
  );
}

export default PlcVariable;
