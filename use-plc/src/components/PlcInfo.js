import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrochip,
  faDoorOpen,
  faCheckToSlot,
  faPenToSquare,
  faCircleXmark,
  faSquarePlus,
  faCircleCheck,
  faCircleArrowDown,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import {
  DropdownButton,
  Dropdown,
  Form,
  Row,
  Col,
  Stack,
} from "react-bootstrap";
import { useState } from "react";
import { downloadAsJson } from "../App";

const initialVariable = {
  Name: "",
  DB: "",
  Type: "Select Type",
  Address: 0,
  DefaultValues: [],
};

function PlcInfo({ info, editMode, dispatch }) {
  const [variable, setVariable] = useState(initialVariable);

  function handleUpdate(newState) {
    dispatch({
      type: "updatePlcInfo",
      payLoad: newState,
    });
  }

  function handleAddVariableUpdate() {
    dispatch({ type: "addVariable", payLoad: variable });
    setVariable({
      ...initialVariable,
      Name: "",
      DB: "",
      Type: "Select Type",
      Address: 0,
      DefaultValues: [],
    });
  }

  return (
    <>
      <Accordion className="plcInfo" defaultActiveKey="0" alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Plc info</Accordion.Header>
          <Accordion.Body>
            {editMode === "" && (
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
                    disabled={info.host === "0"}
                    className="p-2 ms-auto"
                    onClick={() => dispatch({ type: "refresh" })}
                    variant="success"
                  >
                    Read all
                  </Button>
                  <Button
                    onClick={() => dispatch({ type: "toggleEditPlcInfo" })}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                  <Button
                    onClick={() => dispatch({ type: "toggleAddVariable" })}
                  >
                    <FontAwesomeIcon icon={faSquarePlus} />
                  </Button>
                  <Button onClick={() => downloadAsJson()}>
                    <FontAwesomeIcon icon={faCircleArrowDown} />
                  </Button>
                  <Button
                    onClick={() => dispatch({ type: "saveLocalStorage" })}
                  >
                    <FontAwesomeIcon icon={faFloppyDisk} />
                  </Button>
                </Stack>
              </>
            )}
            {editMode === "editPlcInfo" && (
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
                    onClick={() => dispatch({ type: "toggleEditPlcInfo" })}
                  >
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </Button>
                </Stack>
              </>
            )}
            {editMode === "addVariable" && (
              <>
                <Form>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formHorizontalEmail"
                  >
                    <Form.Label column sm={2}>
                      Variable Name
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        placeholder="Enter variable name"
                        value={variable.Name}
                        onChange={(e) => {
                          setVariable({ ...variable, Name: e.target.value });
                        }}
                      />
                    </Col>
                    <Form.Label column sm={2}>
                      Data Block
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        value={variable.Port}
                        onChange={(e) => {
                          setVariable({ ...variable, DB: e.target.value });
                        }}
                        placeholder="Enter Data Block number"
                      />
                    </Col>
                    <Form.Label column sm={2}>
                      Type
                    </Form.Label>
                    <Col sm={10}>
                      <DropdownButton
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                        title={variable.Type}
                        onSelect={(key, event) => {
                          setVariable({ ...variable, Type: key });
                        }}
                      >
                        {["Int", "Real", "Bool", "String"].map(
                          (type, index) => {
                            return (
                              <Dropdown.Item key={index} eventKey={type}>
                                {type}
                              </Dropdown.Item>
                            );
                          }
                        )}
                      </DropdownButton>
                    </Col>
                    <Form.Label column sm={2}>
                      Address
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        value={variable.Size}
                        onChange={(e) => {
                          setVariable({ ...variable, Address: e.target.value });
                        }}
                        placeholder="Enter variable size"
                      />
                    </Col>
                  </Form.Group>
                </Form>
                <Stack direction="horizontal" gap={2}>
                  <Button
                    className="p-2 ms-auto"
                    onClick={() => handleAddVariableUpdate()}
                  >
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </Button>

                  <Button
                    className=""
                    onClick={() => dispatch({ type: "toggleAddVariable" })}
                  >
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
