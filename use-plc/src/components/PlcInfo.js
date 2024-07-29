import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrochip,
  faDoorOpen,
  faCheckToSlot,
  faPenToSquare,
  faCircleXmark,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { Form, Row, Col, Stack } from "react-bootstrap";

function PlcInfo({ info, editMode, dispatch }) {
  function handleUpdate(newState) {
    dispatch({
      type: "updatePlcInfo",
      payLoad: newState,
    });
  }

  return (
    <>
      <Accordion className="plcInfo" defaultActiveKey="0" alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Plc info</Accordion.Header>
          <Accordion.Body>
            {!editMode && (
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
                <Stack direction="horizontal" gap={2}>
                  <Button
                    className="p-2 ms-auto"
                    onClick={() => dispatch({ type: "refresh" })}
                    variant="success">
                    Read all
                  </Button>
                  <Button
                    onClick={() => dispatch({ type: "toggleEditPlcInfo" })}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                </Stack>
              </>
            )}
            {editMode && (
              <>
                <Form>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                      Address
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        value={info.host}
                        placeholder="Enter plc address"
                        onChange={(e) => {
                          handleUpdate({ ...info, host: e.target.value });
                        }}
                      />
                    </Col>
                    <Form.Label column sm={2}>
                      Port
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        value={info.port}
                        onChange={(e) => {
                          handleUpdate({ ...info, port: e.target.value });
                        }}
                        placeholder="Enter plc port"
                      />
                    </Col>
                    <Form.Label column sm={2}>
                      Rack
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        value={info.rack}
                        onChange={(e) => {
                          handleUpdate({ ...info, rack: e.target.value });
                        }}
                        placeholder="Enter plc rack"
                      />
                    </Col>
                    <Form.Label column sm={2}>
                      Slot
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        value={info.slot}
                        onChange={(e) => {
                          handleUpdate({ ...info, slot: e.target.value });
                        }}
                        placeholder="Enter plc slot"
                      />
                    </Col>
                  </Form.Group>
                </Form>
                <Stack direction="horizontal" gap={2}>
                  <Button
                    className="p-2 ms-auto"
                    onClick={() => dispatch({ type: "toggleEditPlcInfo" })}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </Button>
                </Stack>
              </>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default PlcInfo;
