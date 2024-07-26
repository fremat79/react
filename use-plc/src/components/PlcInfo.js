import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrochip,
  faDoorOpen,
  faCheckToSlot,
  faPenToSquare,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const initialState = {
  plcInfo: { address: "", port: "", rack: "", slot: "" },
  editMode: false,
};

function PlcInfo({ info, dispatch }) {
  const [plcInfo, setPlcInfo] = useState(initialState);
  return (
    <>
      <Accordion className="plcInfo" defaultActiveKey="0" alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Plc info</Accordion.Header>
          <Accordion.Body>
            {!plcInfo.editMode && (
              <>
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faMicrochip} />
                  </li>
                  <li>{info.host}</li>
                  <li>
                    <FontAwesomeIcon icon={faDoorOpen} />
                  </li>
                  <li>{info.port}</li>
                  <li>
                    <FontAwesomeIcon icon={faCheckToSlot} />
                  </li>
                  <li>{info.rack}</li>
                  <li>
                    <FontAwesomeIcon icon={faCheckToSlot} />
                  </li>
                  <li>{info.slot}</li>
                </ul>
                <Button
                  onClick={() => dispatch({ type: "refresh" })}
                  variant="success"
                >
                  Read all
                </Button>
                <Button
                  onClick={() => setPlcInfo({ ...plcInfo, editMode: true })}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
              </>
            )}
            {plcInfo.editMode && (
              <>
                <Form>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formHorizontalEmail"
                  >
                    <Form.Label column sm={2}>
                      Address
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control placeholder="Enter plc address" />
                    </Col>
                    <Form.Label column sm={2}>
                      Port
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control placeholder="Enter plc port" />
                    </Col>
                    <Form.Label column sm={2}>
                      Rack
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control placeholder="Enter plc rack" />
                    </Col>
                    <Form.Label column sm={2}>
                      Slot
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control placeholder="Enter plc slot" />
                    </Col>
                  </Form.Group>
                </Form>
                <Button
                  onClick={() => setPlcInfo({ ...plcInfo, editMode: false })}
                >
                  <FontAwesomeIcon icon={faFloppyDisk} />
                </Button>
              </>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default PlcInfo;
